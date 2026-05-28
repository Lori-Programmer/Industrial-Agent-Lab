const rules = [
  "仅用于固定场景物体识别实验",
  "不做人脸识别、身份识别、情绪判断",
  "不做人员监控、考勤管理或人员状态识别",
  "不识别车牌、身份证、银行卡、学生证等敏感信息",
  "第一版不上传、不保存视频或图片"
];

export function PrivacyNotice() {
  return (
    <article className="edge-panel border-signal-cyan/30 bg-signal-cyan/[0.06]">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-signal-cyan/15 text-2xl" aria-hidden="true">
          🛡
        </span>
        <div>
          <p className="edge-eyebrow">Privacy & Safety</p>
          <h2 className="edge-heading">隐私与安全边界</h2>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            本工具仅用于固定场景物体识别实验，不用于人脸识别、身份识别、情绪判断、人员监控或考勤管理。
            默认情况下，摄像头画面仅在用户本地浏览器中处理，不上传、不保存视频或图片。
            请勿将摄像头对准他人、隐私区域或公共人群场景。
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {rules.map((rule) => (
          <div key={rule} className="flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-200">
            <span className="text-signal-green" aria-hidden="true">🔒</span>
            {rule}
          </div>
        ))}
      </div>
    </article>
  );
}
