import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  return {
    title: post?.title || "文章"
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);

  return (
    <main>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-10">
        <Link href="/blog" className="text-sm font-semibold text-signal-blue">
          返回文章列表
        </Link>
        <p className="mt-10 text-sm font-semibold text-slate-500 dark:text-slate-400">{post.date}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950 dark:text-white">{post.title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{post.description}</p>
        <div
          className="prose-industrial mt-10"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </main>
  );
}
