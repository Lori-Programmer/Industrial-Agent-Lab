import Link from "next/link";

const tones = [
  "from-slate-950 to-blue-950",
  "from-slate-950 to-cyan-950",
  "from-slate-950 to-emerald-950",
  "from-slate-950 to-amber-950"
];

export function RoutePokerCard({ track, index }) {
  return (
    <Link
      href={`/routes#${track.id}`}
      className={`group min-h-[260px] rounded-lg bg-gradient-to-br ${tones[(index - 1) % tones.length]} p-5 text-white shadow-panel transition hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.12] text-sm font-semibold">
          {String(index).padStart(2, "0")}
        </span>
        <span className="rounded-md border border-white/[0.15] px-2 py-1 text-xs text-slate-300">{track.badge}</span>
      </div>
      <h3 className="mt-14 text-2xl font-semibold tracking-normal">{track.title}</h3>
      <p className="mt-4 text-sm leading-6 text-slate-300">{track.description}</p>
      <p className="mt-7 text-sm font-semibold text-signal-cyan">进入路线</p>
    </Link>
  );
}
