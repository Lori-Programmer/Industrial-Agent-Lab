import { channels } from "@/lib/site-data";

export const metadata = {
  title: "联系方式"
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>联系方式</h1>
        <p>用于定制工具、大学私人辅导、项目合作、开源共创和行业交流。</p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-16 sm:px-8 lg:grid-cols-3 lg:px-10">
        <article className="panel">
          <h2 className="text-2xl font-semibold">私域联系</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p>微信：vx-Carloslyq</p>
            <p>邮箱：machinelori82@gmail.com</p>
            <p>咨询范围：路线规划、项目模板、工具定制、竞赛/毕设/求职作品集。</p>
          </div>
          <a className="btn-primary mt-6 w-full" href="mailto:machinelori82@gmail.com?subject=UTMAXS%20%E5%92%A8%E8%AF%A2">
            发送邮件咨询
          </a>
        </article>

        <article className="panel lg:col-span-2">
          <h2 className="text-2xl font-semibold">账号矩阵</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {channels.map((channel) => (
              <a key={channel.name} className="rounded-lg border border-slate-200 p-4 transition hover:border-signal-blue dark:border-white/10" href={channel.href} target="_blank" rel="noreferrer">
                <p className="font-semibold">{channel.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{channel.description}</p>
              </a>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
