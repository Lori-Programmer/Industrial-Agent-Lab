import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { RoutePokerCard } from "@/components/route-poker-card";
import { SectionHeading } from "@/components/section-heading";
import { channels, products, routeTracks } from "@/lib/site-data";

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);

  return (
    <main>
      <section className="relative isolate min-h-[calc(100vh-72px)] overflow-hidden bg-industrial-950 text-white">
        <img
          src="/images/industrial-lab-hero.webp"
          alt="PLC 控制柜、机器人、工业仿真屏幕组成的智能制造实验室"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.58]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,18,.95)_0%,rgba(7,11,18,.76)_45%,rgba(7,11,18,.42)_100%)]" />
        <div className="industrial-grid absolute inset-0 opacity-60" />
        <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col justify-center px-5 py-20 sm:px-8 lg:px-10">
          <p className="mb-5 text-sm font-semibold uppercase tracking-normal text-signal-cyan">
            工业智能库 / PLC / 工业通信 / 仿真 / MARL / 工业 AI
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] tracking-normal sm:text-6xl lg:text-7xl">
            UTMAXS-尤迈
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
            自动化专业提供 PLC、通信、仿真、MARL 学习路线、项目模板和开源工具的网站。
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link className="btn-primary" href="/routes">
              查看工程路线
            </Link>
            <Link className="btn-secondary" href="/portfolio">
              查看作品集
            </Link>
            <Link className="btn-secondary" href="/contact">
              联系定制/辅导
            </Link>
          </div>
          <div className="mt-14 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              ["面向人群", "机械、自动化、智能制造学生与从业者"],
              ["核心资产", "路线图、资料包、模板、开源工具"],
              ["导流目标", "Bilibili、GitHub、个人私域账号"]
            ].map(([title, value]) => (
              <div key={title} className="rounded-lg border border-white/[0.15] bg-white/[0.08] p-4">
                <p className="text-sm text-slate-300">{title}</p>
                <p className="mt-2 text-base font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Route Cards"
          title="像抽一张工程牌一样选择你的路线"
          description="首页先回答三件事：这个网站面向谁、有哪些行业路线、下一步应该点哪里。"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {routeTracks.slice(0, 4).map((track, index) => (
            <RoutePokerCard key={track.id} track={track} index={index + 1} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/70 py-20 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <SectionHeading
            eyebrow="Value"
            title="你能从这里获得什么"
            description="先用公开资料建立行业可见度，再把真实项目、工具模板和联系方式连到个人账号矩阵。"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.title} product={product} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            ["1", "路线分类", "/routes", "看 PLC、通信、仿真、MARL、工业 AI 和产品化主线"],
            ["2", "产品/服务", "/services", "了解定制工具、路线资料和大学私人辅导"],
            ["3", "作品集", "/portfolio", "用项目证据判断能力边界和合作方向"],
            ["4", "联系方式", "/contact", "关注账号、进入私域、发起合作咨询"]
          ].map(([no, title, href, desc]) => (
            <Link
              key={title}
              href={href}
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-signal-blue hover:shadow-panel dark:border-white/10 dark:bg-white/[0.04]"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-sm font-semibold text-white dark:bg-signal-blue">
                {no}
              </span>
              <h2 className="mt-6 text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-industrial-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-sm font-semibold text-signal-cyan">Channels</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal">公开内容导流到账号，深度合作回到私域</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {channels.slice(0, 3).map((channel) => (
              <a key={channel.name} className="btn-secondary" href={channel.href} target="_blank" rel="noreferrer">
                {channel.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
