const scenes = ["桌面物体", "工具设备", "PLC 电气元件", "纸箱货物", "车位状态", "其他"];

export function DetectionModeForm({ form, error, onChange, onStart }) {
  function update(patch) {
    onChange({ ...form, ...patch });
  }

  return (
    <article className="edge-panel">
      <p className="edge-eyebrow">Detection Setup</p>
      <h2 className="edge-heading">识别方式选择</h2>
      <div className="mt-6 space-y-5">
        <fieldset>
          <legend className="text-sm font-semibold text-slate-200">识别方式</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <label className="edge-option">
              <input type="radio" name="mode" checked={form.mode === "camera"} onChange={() => update({ mode: "camera" })} />
              <span>轻量摄像头识别</span>
            </label>
            <label className="edge-option opacity-60">
              <input type="radio" name="mode" disabled checked={form.mode === "upload"} onChange={() => update({ mode: "upload" })} />
              <span>上传图片识别（后续接入）</span>
            </label>
            <label className="edge-option">
              <input type="radio" name="mode" checked={form.mode === "demo"} onChange={() => update({ mode: "demo" })} />
              <span>查看 mock 案例</span>
            </label>
          </div>
        </fieldset>

        <label className="block">
          <span className="text-sm font-semibold text-slate-200">识别场景</span>
          <select
            value={form.scene}
            onChange={(event) => update({ scene: event.target.value })}
            className="mt-3 w-full rounded-md border border-white/10 bg-black/35 px-3 py-3 text-sm text-white outline-none focus:border-signal-cyan"
          >
            {scenes.map((scene) => (
              <option key={scene} value={scene} className="bg-industrial-950">
                {scene}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-start gap-3 rounded-lg border border-signal-cyan/30 bg-signal-cyan/10 p-4 text-sm leading-6 text-slate-200">
          <input
            type="checkbox"
            checked={form.confirmed}
            onChange={(event) => update({ confirmed: event.target.checked })}
            className="mt-1 h-4 w-4"
          />
          <span>我已阅读并确认：本工具只用于物体识别，不用于识别人、监控人或处理敏感个人信息。</span>
        </label>

        {error ? <p className="rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-100">{error}</p> : null}

        <button type="button" onClick={onStart} className="btn-primary w-full">
          开始轻量识别
        </button>
      </div>
    </article>
  );
}
