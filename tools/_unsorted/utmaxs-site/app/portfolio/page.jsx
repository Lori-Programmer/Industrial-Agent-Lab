import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/site-data";

export const metadata = {
  title: "作品集"
};

export default function PortfolioPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Portfolio</p>
        <h1>作品集</h1>
        <p>用真实项目、工具原型和实验复现证明能力，不只展示概念。</p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Evidence"
          title="面向学生作品、竞赛、毕设和求职展示"
          description="这些条目可继续替换为你的真实截图、视频、GitHub 仓库和 Bilibili 演示。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
