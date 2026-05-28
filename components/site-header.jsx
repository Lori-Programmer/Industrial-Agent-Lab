"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  ["路线分类", "/routes"],
  ["关于网站", "/about"],
  ["产品/服务", "/services"],
  ["作品集", "/portfolio"],
  ["文章", "/blog"],
  ["联系", "/contact"]
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-white/10 dark:bg-industrial-950">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex min-w-[176px] items-center gap-3">
          <img className="h-10 w-10 rounded-md bg-slate-950 object-cover" src="/icon.png" alt="UTMAXS-尤迈" />
          <span>
            <span className="block text-base font-semibold leading-5">UTMAXS-尤迈</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">工业智能库</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="主导航">
          {navItems.map(([label, href]) => {
            const active = pathname === href || (href !== "/" && pathname?.startsWith(`${href}/`));
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-slate-200 px-5 py-2 dark:border-white/10 lg:hidden" aria-label="移动端主导航">
        {navItems.map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 rounded-md px-3 py-2 text-sm text-slate-600 dark:text-slate-300">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
