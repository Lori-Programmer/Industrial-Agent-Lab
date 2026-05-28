import { RouteMindmap } from "@/components/route-mindmap";
import { SectionHeading } from "@/components/section-heading";
import { routeTracks } from "@/lib/site-data";

export const metadata = {
  title: "路线分类"
};

export default function RoutesPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Roadmaps</p>
        <h1>路线分类</h1>
        <p>用树状图把行业路线拆成基础、项目、工具和作品输出四层。</p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <RouteMindmap tracks={routeTracks} />
      </section>

      <section className="border-t border-slate-200 bg-white/70 py-16 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Details"
            title="每条路线都要导向一个能展示的工程作品"
            description="路线不是课程目录，而是从基础到项目、从工具到作品集的完整路径。"
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {routeTracks.map((track) => (
              <article key={track.id} id={track.id} className="panel scroll-mt-24">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-signal-blue">{track.badge}</p>
                    <h2 className="mt-2 text-2xl font-semibold">{track.title}</h2>
                  </div>
                  <span className="rounded-md border border-slate-200 px-3 py-1 text-xs text-slate-500 dark:border-white/10 dark:text-slate-300">
                    {track.level}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{track.description}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {track.steps.map((step) => (
                    <div key={step} className="rounded-md bg-slate-100 p-3 text-sm text-slate-700 dark:bg-white/[0.06] dark:text-slate-200">
                      {step}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
