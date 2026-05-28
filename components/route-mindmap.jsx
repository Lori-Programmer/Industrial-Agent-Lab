export function RouteMindmap({ tracks }) {
  return (
    <div className="route-tree relative">
      <div className="mx-auto mb-10 flex max-w-sm items-center justify-center rounded-lg bg-slate-950 px-6 py-6 text-center text-xl font-semibold text-white shadow-panel dark:bg-signal-blue dark:text-slate-950">
        工业智能库路线体系
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tracks.map((track) => (
          <article key={track.id} className="relative rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <span className="absolute -top-3 left-5 rounded-md bg-signal-blue px-2 py-1 text-xs font-semibold text-slate-950">
              {track.badge}
            </span>
            <h2 className="mt-4 text-xl font-semibold">{track.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{track.description}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {track.steps.map((step) => (
                <li key={step} className="rounded-md bg-slate-100 px-3 py-2 dark:bg-white/[0.06]">
                  {step}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
