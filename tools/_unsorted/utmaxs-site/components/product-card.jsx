import Link from "next/link";

export function ProductCard({ product, compact = false }) {
  const internal = product.href.startsWith("/");
  const className = "mt-6 inline-flex text-sm font-semibold text-signal-blue";

  return (
    <article className="panel flex h-full flex-col">
      <p className="text-sm font-semibold text-signal-blue">{product.type}</p>
      <h2 className={`${compact ? "text-xl" : "text-2xl"} mt-3 font-semibold tracking-normal`}>{product.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{product.description}</p>
      {internal ? (
        <Link className={className} href={product.href}>
          {product.action}
        </Link>
      ) : (
        <a className={className} href={product.href} target="_blank" rel="noreferrer">
          {product.action}
        </a>
      )}
    </article>
  );
}
