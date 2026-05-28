const mockBoxes = [
  {
    className: "left-[14%] top-[18%] h-[30%] w-[30%] border-signal-cyan bg-signal-cyan/10",
    colorClass: "text-signal-cyan"
  },
  {
    className: "left-[56%] top-[18%] h-[18%] w-[26%] border-signal-green bg-signal-green/10",
    colorClass: "text-signal-green"
  },
  {
    className: "left-[40%] top-[62%] h-[20%] w-[22%] border-signal-amber bg-signal-amber/10",
    colorClass: "text-signal-amber"
  }
];

export function DetectionCanvas({ active, detections }) {
  if (!active || detections.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {detections.map((item, index) => {
        const box = mockBoxes[index] || mockBoxes[0];

        return (
          <div key={item.name} className={`absolute rounded border-2 ${box.className}`}>
            <span className={`absolute -top-6 left-0 whitespace-nowrap rounded bg-black/75 px-2 py-1 text-[11px] ${box.colorClass}`}>
              {item.name} {(item.confidence * 100).toFixed(0)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
