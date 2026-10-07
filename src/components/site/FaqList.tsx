import type { Faq } from "@/lib/faq";

/** Native details/summary: accessible and works without JavaScript. */
export function FaqList({ items, headingLevel = 3 }: { items: Faq[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/40">
      {items.map((f) => (
        <details key={f.q} className="group px-5 py-1 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
            <H className="text-[15px] font-medium text-fg sm:text-base">{f.q}</H>
            <span aria-hidden="true" className="grid size-6 flex-none place-items-center rounded-full border border-line-2 text-muted transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
