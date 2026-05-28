import { useEffect, useMemo, useRef, useState } from "react";
import { attachCameraStream, listCameraDevices, startCameraStream, stopCameraStream } from "./lib/cameraController";
import { DetectionLoop } from "./lib/detectionLoop";
import { evaluateEngineeringStatus } from "./lib/engineeringRules";
import { buildExportPayload, exportJson } from "./lib/exportJson";
import { createMockDetectionResult } from "./lib/mockDetections";
import { runInference } from "./lib/onnx/runInference";
import type { DetectionResult, EngineeringStatus, InferenceMode, ResolutionKey, SceneType } from "./types";

const SCENES: SceneType[] = [
  "PLC Debugging Desk",
  "Tools And Devices",
  "Elevator Door State",
  "Parking Space State"
];

const CAMERA_AUTO_STOP_MS = 10 * 60 * 1000;
const FPS_OPTIONS = [3, 5, 10, 15];
const RESOLUTION_OPTIONS: ResolutionKey[] = ["320x240", "640x480", "1280x720"];

export default function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const loopRef = useRef<DetectionLoop | null>(null);
  const autoStopTimerRef = useRef<number | null>(null);

  const [privacyConfirmed, setPrivacyConfirmed] = useState(false);
  const [notice, setNotice] = useState("请先阅读并确认隐私与安全边界。");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [inferenceMode, setInferenceMode] = useState<InferenceMode>("offline-mock");
  const [scene, setScene] = useState<SceneType>("PLC Debugging Desk");
  const [fps, setFps] = useState(5);
  const [resolution, setResolution] = useState<ResolutionKey>("640x480");
  const [showBoxes, setShowBoxes] = useState(true);
  const [showEngineering, setShowEngineering] = useState(true);
  const [modelPath] = useState("后续接入：本地 ONNX 模型路径");
  const [result, setResult] = useState<DetectionResult>(() => createMockDetectionResult());
  const [engineeringStatus, setEngineeringStatus] = useState<EngineeringStatus>(() =>
    evaluateEngineeringStatus(createMockDetectionResult().objects)
  );

  const canUseCamera = privacyConfirmed;

  const cameraLabel = useMemo(() => {
    if (!devices.length) return "未检测到摄像头设备";
    return devices.find((device) => device.deviceId === selectedDeviceId)?.label || "默认摄像头";
  }, [devices, selectedDeviceId]);

  async function refreshDevices() {
    const nextDevices = await listCameraDevices();
    setDevices(nextDevices);
    if (!selectedDeviceId && nextDevices[0]) {
      setSelectedDeviceId(nextDevices[0].deviceId);
    }
  }

  function stopDetection() {
    loopRef.current?.stop();
    loopRef.current = null;
    setIsDetecting(false);
  }

  function stopCamera(message = "摄像头已停止，资源已释放。") {
    if (autoStopTimerRef.current !== null) {
      window.clearTimeout(autoStopTimerRef.current);
      autoStopTimerRef.current = null;
    }
    stopDetection();
    stopCameraStream(streamRef.current, videoRef.current);
    streamRef.current = null;
    setIsCameraOn(false);
    clearCanvas();
    setNotice(message);
  }

  async function startCamera(deviceId = selectedDeviceId) {
    if (!canUseCamera) {
      setNotice("请先确认隐私与安全边界。");
      return;
    }

    try {
      stopCameraStream(streamRef.current, videoRef.current);
      streamRef.current = null;
      const stream = await startCameraStream({ deviceId: deviceId || undefined, resolution });
      streamRef.current = stream;

      if (videoRef.current) {
        await attachCameraStream(videoRef.current, stream);
      }

      setIsCameraOn(true);
      setNotice("摄像头已开启。当前模式为离线 Demo，不上传、不保存画面。");
      autoStopTimerRef.current = window.setTimeout(() => {
        stopCamera("摄像头已自动停止，资源已释放。");
      }, CAMERA_AUTO_STOP_MS);
      await refreshDevices();
    } catch {
      setNotice("无法开启摄像头，请检查 Windows 摄像头权限、设备占用或浏览器内核权限。");
    }
  }

  async function switchCamera() {
    if (!canUseCamera) {
      setNotice("请先确认隐私与安全边界。");
      return;
    }

    if (devices.length <= 1) {
      setNotice("当前只检测到一个摄像头设备，无法切换。");
      return;
    }

    const currentIndex = devices.findIndex((device) => device.deviceId === selectedDeviceId);
    const nextDevice = devices[(currentIndex + 1) % devices.length] ?? devices[0];
    setSelectedDeviceId(nextDevice.deviceId);
    stopCamera();
    await startCamera(nextDevice.deviceId);
  }

  async function startDetection() {
    if (!canUseCamera) {
      setNotice("请先确认隐私与安全边界。");
      return;
    }

    if (!isCameraOn) {
      setNotice("请先开启摄像头，再开始识别。");
      return;
    }

    stopDetection();
    const loop = new DetectionLoop(fps, async () => {
      const nextResult = await runInference({
        scene,
        mode: inferenceMode,
        video: videoRef.current,
        modelPath: inferenceMode === "offline-onnx" ? modelPath : undefined
      });
      setResult(nextResult);
      setEngineeringStatus(evaluateEngineeringStatus(nextResult.objects, nextResult.scene));
    });
    loopRef.current = loop;
    loop.start();
    setIsDetecting(true);
    setNotice("本地识别中：V1 使用 mock 数据，ONNX Local 将在后续版本接入。");
  }

  async function handleExportJson() {
    const payload = buildExportPayload(result, engineeringStatus);
    const saveResult = await exportJson(payload);
    if (saveResult.status === "saved") {
      setNotice("JSON 已导出。仅导出结构化结果，不包含图片或视频。");
    } else {
      setNotice("已取消 JSON 导出。");
    }
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    context?.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawBoxes() {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, width, height);
    if (!showBoxes || !isCameraOn) return;

    context.lineWidth = 3;
    context.font = "14px system-ui";
    result.boxes.forEach((box) => {
      const x = box.x * width;
      const y = box.y * height;
      const boxWidth = box.width * width;
      const boxHeight = box.height * height;
      const label = `${box.label} ${(box.confidence * 100).toFixed(0)}%`;

      context.strokeStyle = "#55f5d2";
      context.fillStyle = "rgba(85, 245, 210, 0.12)";
      context.strokeRect(x, y, boxWidth, boxHeight);
      context.fillRect(x, y, boxWidth, boxHeight);
      context.fillStyle = "#071015";
      context.fillRect(x, Math.max(0, y - 24), context.measureText(label).width + 14, 22);
      context.fillStyle = "#a8ffec";
      context.fillText(label, x + 7, Math.max(15, y - 8));
    });
  }

  useEffect(() => {
    void refreshDevices();
  }, []);

  useEffect(() => {
    loopRef.current?.setFps(fps);
  }, [fps]);

  useEffect(() => {
    drawBoxes();
  }, [result, showBoxes, isCameraOn]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      loopRef.current?.stop();
      stopCameraStream(streamRef.current, videoRef.current);
      streamRef.current = null;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Windows Offline Demo</p>
          <h1>工业视觉识物实验室 Windows 版</h1>
          <h2>Edge Vision Lab Desktop</h2>
          <p className="hero-copy">
            离线、本地、固定工业场景物体识别工具。适用于工业视觉、边缘 AI、工程作品集和设备状态感知 Demo。
          </p>
        </div>
        <div className="status-card">
          <span>运行模式</span>
          <strong>{inferenceMode === "offline-mock" ? "offline-mock" : "offline-onnx"}</strong>
          <small>不登录 / 不联网 / 不上传 / 不保存摄像头内容</small>
        </div>
      </section>

      <section className="safety-card">
        <h3>隐私与安全边界</h3>
        <p>本工具为 Windows 离线 Demo，仅用于固定工业场景物体识别实验。</p>
        <p>本工具不做人脸识别、身份识别、情绪识别、人员监控或考勤管理。</p>
        <p>本工具默认不上传、不保存摄像头画面、图片或视频。</p>
        <p>请勿将摄像头对准他人、隐私区域、公共人群场景、车牌、证件、学生信息或其他敏感信息。</p>
        <p>识别结果仅用于技术展示和工程学习，不作为生产控制、安防、执法、考勤或商业决策依据。</p>
        <label className="confirm-row">
          <input
            type="checkbox"
            checked={privacyConfirmed}
            onChange={(event) => setPrivacyConfirmed(event.target.checked)}
          />
          <span>我已阅读并确认：本工具只用于固定工业物体识别，不用于识别人、监控人或处理敏感个人信息。</span>
        </label>
      </section>

      <section className="workspace-grid">
        <div className="panel camera-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Camera</p>
              <h3>摄像头区域</h3>
            </div>
            <span className={isCameraOn ? "pill active" : "pill"}>{isCameraOn ? "摄像头运行中" : "未开启"}</span>
          </div>

          <div className="form-grid compact">
            <label>
              摄像头设备
              <select
                value={selectedDeviceId}
                onChange={(event) => setSelectedDeviceId(event.target.value)}
                disabled={!devices.length || isDetecting}
              >
                {devices.length ? (
                  devices.map((device, index) => (
                    <option value={device.deviceId} key={device.deviceId}>
                      {device.label || `摄像头 ${index + 1}`}
                    </option>
                  ))
                ) : (
                  <option value="">默认摄像头</option>
                )}
              </select>
            </label>
            <label>
              场景类型
              <select value={scene} onChange={(event) => setScene(event.target.value as SceneType)}>
                {SCENES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="video-frame">
            <video ref={videoRef} playsInline muted />
            <canvas ref={canvasRef} aria-hidden="true" />
            {!isCameraOn && <div className="video-placeholder">确认隐私边界后开启摄像头</div>}
          </div>

          <div className="button-row">
            <button onClick={() => void refreshDevices()}>刷新设备</button>
            <button onClick={() => void startCamera()} disabled={!canUseCamera || isCameraOn}>
              开启摄像头
            </button>
            <button onClick={() => stopCamera()} disabled={!isCameraOn}>
              停止摄像头
            </button>
            <button onClick={() => void switchCamera()} disabled={!canUseCamera || devices.length <= 1}>
              切换摄像头
            </button>
            <button onClick={() => void startDetection()} disabled={!canUseCamera || !isCameraOn || isDetecting}>
              开始识别
            </button>
            <button onClick={stopDetection} disabled={!isDetecting}>
              停止识别
            </button>
          </div>

          <p className="notice">{notice}</p>
          <p className="device-line">当前设备：{cameraLabel}</p>
        </div>

        <aside className="panel settings-panel">
          <p className="eyebrow">Settings</p>
          <h3>设置区</h3>
          <label>
            推理模式
            <select value={inferenceMode} onChange={(event) => setInferenceMode(event.target.value as InferenceMode)}>
              <option value="offline-mock">Mock Demo</option>
              <option value="offline-onnx" disabled>
                ONNX Local，后续接入
              </option>
            </select>
          </label>
          <label>
            模型路径
            <input value={modelPath} disabled readOnly />
          </label>
          <label>
            识别频率
            <select value={fps} onChange={(event) => setFps(Number(event.target.value))}>
              {FPS_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item} FPS
                </option>
              ))}
            </select>
          </label>
          <label>
            摄像头分辨率
            <select value={resolution} onChange={(event) => setResolution(event.target.value as ResolutionKey)}>
              {RESOLUTION_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="switch-row">
            <input type="checkbox" checked={showBoxes} onChange={(event) => setShowBoxes(event.target.checked)} />
            <span>显示检测框</span>
          </label>
          <label className="switch-row">
            <input
              type="checkbox"
              checked={showEngineering}
              onChange={(event) => setShowEngineering(event.target.checked)}
            />
            <span>显示工程状态判断</span>
          </label>
        </aside>
      </section>

      <section className="workspace-grid lower">
        <div className="panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Detection Result</p>
              <h3>识别结果</h3>
            </div>
            <button onClick={() => void handleExportJson()}>导出 JSON</button>
          </div>
          <div className="result-table">
            <div className="table-head">
              <span>物体名称</span>
              <span>数量</span>
              <span>置信度</span>
              <span>模式</span>
            </div>
            {result.objects.map((item) => (
              <div className="table-row" key={item.name}>
                <span>{item.displayName}</span>
                <span>{item.count}</span>
                <span>{Math.round(item.confidence * 100)}%</span>
                <span>{result.mode}</span>
              </div>
            ))}
          </div>
          <p className="meta-line">识别时间：{new Date(result.detectedAt).toLocaleString()}</p>
          <p className="meta-line">场景类型：{result.scene}</p>
        </div>

        {showEngineering && (
          <div className="panel engineering-panel">
            <p className="eyebrow">Engineering Status</p>
            <h3>工程状态判断</h3>
            <dl className="status-list">
              <div>
                <dt>场景</dt>
                <dd>PLC 调试桌面</dd>
              </div>
              <div>
                <dt>完整度</dt>
                <dd>{engineeringStatus.completeness}%</dd>
              </div>
              <div>
                <dt>已检测到</dt>
                <dd>PLC 模块、网线、工业交换机、鼠标</dd>
              </div>
              <div>
                <dt>缺失项</dt>
                <dd>电源适配器、HMI、万用表</dd>
              </div>
              <div>
                <dt>状态</dt>
                <dd>{engineeringStatus.displayStatus}</dd>
              </div>
              <div>
                <dt>下一步建议</dt>
                <dd>{engineeringStatus.nextAction}</dd>
              </div>
            </dl>
          </div>
        )}
      </section>
    </main>
  );
}
