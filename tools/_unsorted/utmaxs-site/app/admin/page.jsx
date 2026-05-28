export const metadata = {
  title: "后台管理"
};

export default function AdminPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Admin</p>
        <h1>后台管理</h1>
        <p>后台用于站长管理内容，第一版不对普通用户开放，不做登录、支付或数据库。</p>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="panel">
          <h2 className="text-2xl font-semibold">当前状态：静态占位</h2>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
            文章内容目前通过 <code>content/posts/*.md</code> 管理，路线、产品和作品集通过 <code>lib/site-data.js</code> 管理。
            后续如果内容量变大，可以接入 CMS、GitHub Actions 或独立后台。
          </p>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            TODO：上线后建议在 Nginx 或 Vercel 层面隐藏此页面，或者替换为真实后台入口。
          </p>
        </div>
      </section>
    </main>
  );
}
