"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export function ArticleSearch({ posts }) {
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return posts;
    return posts.filter((post) =>
      [post.title, post.description, post.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [keyword, posts]);

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="article-search">
        搜索文章列表
      </label>
      <input
        id="article-search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="输入 PLC、通信、仿真、MARL、工业 AI..."
        className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-signal-blue dark:border-white/10 dark:bg-white/[0.06]"
      />

      <div className="mt-8 space-y-4">
        {filtered.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block rounded-lg border border-slate-200 bg-white p-5 transition hover:border-signal-blue dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-sm text-slate-500 dark:text-slate-400">{post.date}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal">{post.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{post.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="mt-8 rounded-lg border border-slate-200 p-5 text-sm text-slate-500 dark:border-white/10">
          没有匹配文章。后续会继续补充更多路线和工具记录。
        </p>
      ) : null}
    </div>
  );
}
