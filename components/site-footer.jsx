import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-white/10 dark:bg-industrial-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10 dark:text-slate-400">
        <p>
          © 2026 UTMAXS-尤迈 · 工业智能库 ·{" "}
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
            沪ICP备案2026002695号
          </a>
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/about">关于网站</Link>
          <Link href="/admin">后台管理</Link>
          <Link href="/contact">联系方式</Link>
        </div>
      </div>
    </footer>
  );
}
