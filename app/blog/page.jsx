import { ArticleSearch } from "@/components/article-search";
import { getAllPosts } from "@/lib/content";

export const metadata = {
  title: "文章/博客"
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Blog</p>
        <h1>文章 / 博客</h1>
        <p>沉淀路线、方法、项目复盘、行业观察和工具学习记录。</p>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:px-10">
        <ArticleSearch posts={posts} />
      </section>
    </main>
  );
}
