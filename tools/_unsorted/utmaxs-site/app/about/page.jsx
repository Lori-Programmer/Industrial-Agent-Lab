import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "关于网站"
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">About</p>
        <h1>关于工业智能库</h1>
        <p>UTMAXS-尤迈把自动化学习、项目模板、开源工具和个人作品集中沉淀成一个长期资产库。</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <SectionHeading
          eyebrow="Why"
          title="为什么要做这个网站"
          description="机械、自动化、智能制造学生最难的不是缺资料，而是缺少能落到项目里的路线。"
        />
        <div className="space-y-5 text-slate-700 dark:text-slate-300">
          <p>
            课程、竞赛、毕设、实习和工程现场之间经常断开。这个网站把 PLC、工业通信、仿真、多智能体、MARL、
            工业 AI 和产品化路线拆成能学习、能实践、能展示的路径。
          </p>
          <p>
            长期目标是成为一个个人运营的工业智能库：公开内容用于建立行业名气，资料包和工具模板用于形成信任，
            私域联系用于定制工具、大学私人辅导、项目合作和结识行业前辈。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["解决路线问题", "用树状路线把知识、工具、项目和作品输出连起来。"],
            ["解决资料问题", "把样张、模板和复盘文章沉淀成可联系获取、可持续维护的内容资产。"],
            ["解决信任问题", "用作品集、开源仓库和视频内容展示真实能力证据。"]
          ].map(([title, desc]) => (
            <article key={title} className="panel">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
