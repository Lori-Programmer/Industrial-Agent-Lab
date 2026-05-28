import Link from "next/link";

export function ProjectCard({ project }) {
  const isInternalLink = project.href?.startsWith("/");

  return (
    <article className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
          {project.domain}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">{project.status}</span>
      </div>
      <h2 className="mt-5 text-2xl font-semibold tracking-normal">{project.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.description}</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {project.evidence.map((item) => (
          <div key={item} className="rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600 dark:border-white/10 dark:text-slate-300">
            {item}
          </div>
        ))}
      </div>
      {isInternalLink ? (
        <Link className="mt-6 inline-flex text-sm font-semibold text-signal-blue" href={project.href}>
          查看项目入口
        </Link>
      ) : (
        <a className="mt-6 inline-flex text-sm font-semibold text-signal-blue" href={project.href} target="_blank" rel="noreferrer">
          查看项目入口
        </a>
      )}
    </article>
  );
}
