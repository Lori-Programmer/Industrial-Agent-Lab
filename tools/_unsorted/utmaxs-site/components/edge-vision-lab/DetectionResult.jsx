export function DetectionResult({ detections, scene, lastRunAt, onReset }) {
  return (
    <article className="edge-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="edge-eyebrow">Mock Result</p>
          <h2 className="edge-heading">识别结果</h2>
        </div>
        <span className="rounded-md bg-white/[0.06] px-3 py-2 text-xs text-slate-300">未接入真实模型</span>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/[0.08] text-slate-200">
            <tr>
              <th className="px-3 py-3">物体名称</th>
              <th className="px-3 py-3">数量</th>
              <th className="px-3 py-3">置信度</th>
            </tr>
          </thead>
          <tbody>
            {detections.length > 0 ? (
              detections.map((item) => (
                <tr key={item.name} className="border-t border-white/10">
                  <td className="px-3 py-3">{item.name}</td>
                  <td className="px-3 py-3">
                    {item.count} {item.unit}
                  </td>
                  <td className="px-3 py-3">{(item.confidence * 100).toFixed(0)}%</td>
                </tr>
              ))
            ) : (
              <tr className="border-t border-white/10">
                <td className="px-3 py-4 text-slate-400" colSpan={3}>
                  暂无识别结果。开始识别后将显示 mock 结果。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
        <p>识别时间：{lastRunAt || "未开始"}</p>
        <p>场景类型：{scene}</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" className="btn-secondary" onClick={onReset}>
          重新识别
        </button>
        <a className="btn-secondary" href="#feedback">
          提交反馈
        </a>
      </div>
    </article>
  );
}
