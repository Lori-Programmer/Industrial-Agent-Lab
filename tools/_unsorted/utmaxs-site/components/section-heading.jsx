export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-9 max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p> : null}
    </div>
  );
}
