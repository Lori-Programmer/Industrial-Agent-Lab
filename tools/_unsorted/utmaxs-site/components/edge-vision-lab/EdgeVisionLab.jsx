"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CameraPanel } from "@/components/edge-vision-lab/CameraPanel";
import { DetectionModeForm } from "@/components/edge-vision-lab/DetectionModeForm";
import { DetectionResult } from "@/components/edge-vision-lab/DetectionResult";
import { EdgeVisionHero } from "@/components/edge-vision-lab/EdgeVisionHero";
import { EngineeringStatus } from "@/components/edge-vision-lab/EngineeringStatus";
import { FeedbackForm } from "@/components/edge-vision-lab/FeedbackForm";
import { PrivacyNotice } from "@/components/edge-vision-lab/PrivacyNotice";
import { buildEngineeringStatus } from "@/lib/edge-vision-lab/engineeringRules";
import { mockDetections } from "@/lib/edge-vision-lab/mockDetections";

const initialForm = {
  mode: "camera",
  scene: "PLC 电气元件",
  confirmed: false
};

export function EdgeVisionLab() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const autoStopRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("未开始");
  const [error, setError] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [detections, setDetections] = useState([]);
  const [lastRunAt, setLastRunAt] = useState("");
  const [facingMode, setFacingMode] = useState("environment");

  const engineeringStatus = useMemo(() => buildEngineeringStatus(detections, form.scene), [detections, form.scene]);

  useEffect(() => {
    return () => {
      stopCamera({ updateState: false });
    };
  }, []);

  useEffect(() => {
    function handleBeforeUnload(event) {
      if (!isCameraOn) return;
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isCameraOn]);

  function applyMockResult(nextStatus = "轻量识别完成 / Mock 数据 / 未接入真实模型") {
    setDetections(mockDetections);
    setLastRunAt(new Date().toLocaleString("zh-CN"));
    setStatus(nextStatus);
  }

  function scheduleAutoStop() {
    if (autoStopRef.current) {
      window.clearTimeout(autoStopRef.current);
    }

    autoStopRef.current = window.setTimeout(() => {
      stopCamera();
      autoStopRef.current = null;
    }, 12000);
  }

  function stopCamera({ updateState = true } = {}) {
    if (autoStopRef.current) {
      window.clearTimeout(autoStopRef.current);
      autoStopRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    if (updateState) {
      setIsCameraOn(false);
      setStatus("摄像头已停止，保留最近一次 mock 识别结果");
    }
  }

  async function startCamera(mode = facingMode) {
    stopCamera({ updateState: false });
    setError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("无法开启摄像头，请检查浏览器权限、摄像头设备或 HTTPS 环境。");
      setStatus("摄像头不可用");
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 256, max: 320 },
          height: { ideal: 192, max: 240 },
          frameRate: { ideal: 5, max: 8 }
        },
        audio: false
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setFacingMode(mode);
      setIsCameraOn(true);
      return true;
    } catch (cameraError) {
      stopCamera();
      setError("无法开启摄像头，请检查浏览器权限、摄像头设备或 HTTPS 环境。");
      setStatus("摄像头权限被拒绝或设备不可用");
      return false;
    }
  }

  async function handleStart() {
    setError("");
    if (!form.confirmed) {
      setError("请先确认隐私与安全边界。");
      return;
    }

    if (form.mode === "demo") {
      stopCamera();
      applyMockResult("演示案例 / Mock 数据 / 未接入真实模型");
      return;
    }

    if (form.mode === "upload") {
      setError("上传图片识别为后续接入功能，网站 Demo 不上传图片。");
      setStatus("未接入上传识别");
      return;
    }

    const cameraStarted = await startCamera(facingMode);
    if (cameraStarted) {
      applyMockResult("摄像头已开启 / 轻量 mock 识别完成 / 12 秒后自动停止");
      scheduleAutoStop();
    }
  }

  function handleReset() {
    if (!form.confirmed) {
      setError("请先确认隐私与安全边界。");
      return;
    }

    applyMockResult(isCameraOn ? "重新识别完成 / Mock 数据" : "演示案例 / Mock 数据 / 未开启摄像头");
  }

  async function handleSwitchCamera() {
    if (!form.confirmed) {
      setError("请先确认隐私与安全边界。");
      return;
    }

    if (!isCameraOn) {
      setError("请先开启摄像头，再切换前后摄像头。");
      return;
    }

    const nextMode = facingMode === "user" ? "environment" : "user";
    const cameraStarted = await startCamera(nextMode);
    if (cameraStarted) {
      applyMockResult("已切换摄像头 / 轻量 mock 识别完成 / 12 秒后自动停止");
      scheduleAutoStop();
    }
  }

  return (
    <main className="bg-industrial-950 text-white">
      <EdgeVisionHero />

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-10 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
        <PrivacyNotice />
        <DetectionModeForm form={form} error={error} onChange={setForm} onStart={handleStart} />
      </section>

      <section id="experience" className="mx-auto grid max-w-7xl gap-5 px-5 pb-12 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
        <CameraPanel
          videoRef={videoRef}
          status={status}
          isCameraOn={isCameraOn}
          detections={detections}
          facingMode={facingMode}
          error={error}
          onStart={handleStart}
          onStop={stopCamera}
          onSwitchCamera={handleSwitchCamera}
        />
        <div className="grid gap-5">
          <DetectionResult detections={detections} scene={form.scene} lastRunAt={lastRunAt} onReset={handleReset} />
          <EngineeringStatus status={engineeringStatus} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <FeedbackForm scene={form.scene} />
        <ProjectExplanation />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">
        <TechStack />
        <PortfolioLinks />
      </section>

      <section className="border-t border-white/10 bg-black/35 px-5 py-8 text-sm text-slate-300 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-2">
          <p>
            本页面为个人工程作品集轻量 Demo，仅用于固定场景物体识别实验。摄像头仅在用户主动开启后本地预览，不上传、不保存图片或视频。
          </p>
          <p>ICP备案号：待填写</p>
        </div>
      </section>
    </main>
  );
}

function ProjectExplanation() {
  return (
    <article className="edge-panel">
      <p className="edge-eyebrow">Project Note</p>
      <h2 className="edge-heading">这个 Demo 解决什么问题？</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        网站版保留摄像头预览和 mock 识别内核，但不做连续推理、不加载 ONNX、不上传图片，适合 2 核 2G 服务器承载的静态作品集展示。
        真实模型推理、批量测试和更高帧率演示留给 GitHub 本地运行版。
      </p>
      <p className="mt-4 rounded-lg border border-signal-cyan/25 bg-signal-cyan/10 p-4 text-sm leading-7 text-slate-100">
        普通 AI 识别“这是什么”，本项目进一步判断“这在工程现场意味着什么”。
      </p>
    </article>
  );
}

function TechStack() {
  const tags = [
    "Next.js Static Export",
    "React",
    "Tailwind CSS",
    "Browser Camera",
    "getUserMedia",
    "256x192 优先",
    "5-8 fps camera cap",
    "12 秒自动停止",
    "Mock Data",
    "Engineering Rules",
        "Email Feedback",
    "ONNX 本地版后续接入"
  ];

  return (
    <article className="edge-panel">
      <p className="edge-eyebrow">Tech Stack</p>
      <h2 className="edge-heading">技术栈展示</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-slate-200">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function PortfolioLinks() {
  return (
    <article className="edge-panel mt-5">
      <p className="edge-eyebrow">Portfolio</p>
      <h2 className="edge-heading">作品集链接</h2>
      <div className="mt-5 flex flex-wrap gap-3">
        <a className="btn-primary" href="https://github.com/Lori-Programmer/Industrial-Agent-Lab" target="_blank" rel="noreferrer">
          查看 GitHub 源码
        </a>
        <a className="btn-secondary" href="https://space.bilibili.com/614708521/lists" target="_blank" rel="noreferrer">
          查看 B站演示视频
        </a>
        <a className="btn-secondary" href="/portfolio">
          返回作品集
        </a>
      </div>
      <p className="mt-4 text-xs text-slate-400">网站版保留低资源核心体验，完整模型推理请放在本地运行版中运行。</p>
    </article>
  );
}
