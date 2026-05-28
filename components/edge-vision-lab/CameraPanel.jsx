import { DetectionCanvas } from "@/components/edge-vision-lab/DetectionCanvas";

export function CameraPanel({ videoRef, status, isCameraOn, detections, facingMode, error, onStart, onStop, onSwitchCamera }) {
  const hasDetections = detections.length > 0;

  return (
    <article className="edge-panel">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="edge-eyebrow">Browser Camera Core</p>
          <h2 className="edge-heading">轻量摄像头识别区</h2>
        </div>
        <span className="rounded-md border border-signal-green/30 bg-signal-green/10 px-3 py-2 text-xs text-signal-green">
          {status}
        </span>
      </div>

      <SafetyNotice />

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" className="btn-primary" onClick={onStart}>
          开启摄像头并识别
        </button>
        <button type="button" className="btn-secondary" onClick={onStop} disabled={!isCameraOn}>
          停止摄像头
        </button>
        <button type="button" className="btn-secondary" onClick={onSwitchCamera} disabled={!isCameraOn}>
          切换摄像头
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
        <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">256x192 优先</span>
        <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">5-8 fps camera cap</span>
        <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">12 秒自动停止</span>
        <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">无连续推理循环</span>
        <span className="rounded-md border border-white/10 bg-black/20 px-2 py-1">
          {facingMode === "environment" ? "后置摄像头优先" : "前置摄像头优先"}
        </span>
      </div>

      <div className="relative mx-auto mt-5 aspect-[4/3] w-full max-w-[360px] overflow-hidden rounded-lg border border-white/10 bg-black">
        <video ref={videoRef} autoPlay playsInline muted className={isCameraOn ? "h-full w-full object-cover" : "hidden"} />
        {!isCameraOn ? <MockViewport /> : null}
        {hasDetections ? <DetectionCanvas active detections={detections} /> : null}
        {!hasDetections ? (
          <div className="absolute bottom-3 left-3 rounded-md bg-black/70 px-3 py-2 text-xs text-slate-200">
            等待用户确认后启动轻量识别
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="mt-4 rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-100">{error}</p>
      ) : (
        <p className="mt-4 text-sm leading-6 text-slate-300">
          网站版只做低资源体验：摄像头按需开启，显示一次 mock 识别结果，不跑连续推理、不上传、不保存。
        </p>
      )}
    </article>
  );
}

function MockViewport() {
  return (
    <div className="absolute inset-0 bg-[#08111d]">
      <div className="absolute left-4 top-4 rounded-md bg-black/55 px-3 py-2 text-xs text-slate-200">
        website-light-demo · camera idle
      </div>
      <div className="absolute bottom-4 right-4 rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-slate-300">
        本地预览，不上传
      </div>
    </div>
  );
}

function SafetyNotice() {
  return (
    <section className="mt-5 rounded-lg border border-signal-amber/35 bg-signal-amber/10 p-4 text-sm leading-7 text-slate-100">
      <p className="font-semibold text-signal-amber">免责声明 / Safety Notice</p>
      <p className="mt-2">
        本工具仅用于固定场景物体识别实验，不用于人脸识别、身份识别、情绪判断、人员监控或考勤管理。
        网站版摄像头只在用户主动开启后本地预览，不上传、不保存视频或图片。请勿将摄像头对准他人、隐私区域、公共人群场景、车牌、证件或学生信息。
      </p>
    </section>
  );
}
