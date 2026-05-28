export function EngineeringStatus({ status }) {
  return (
    <article className="edge-panel border-signal-green/30 bg-signal-green/[0.05]">
      <p className="edge-eyebrow">Engineering Status</p>
      <h2 className="edge-heading">工程状态判断</h2>
      <div className="mt-5 grid gap-3 text-sm text-slate-200">
        <Info label="场景" value={status.scene} />
        <Info label="完整度" value={`${status.completeness}%`} />
        <Info label="已检测到" value={status.detected.join("、")} />
        <Info label="缺失项" value={status.missingItems.join("、")} />
        <Info label="状态" value={status.status} strong />
      </div>
      <div className="mt-5 rounded-lg border border-signal-amber/35 bg-signal-amber/10 p-4 text-sm leading-7 text-slate-100">
        下一步建议：{status.nextAction}
      </div>
    </article>
  );
}

function Info({ label, value, strong = false }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3 rounded-md border border-white/10 bg-black/20 px-3 py-2">
      <span className="text-slate-400">{label}</span>
      <span className={strong ? "font-semibold text-signal-amber" : "text-slate-100"}>{value}</span>
    </div>
  );
}
