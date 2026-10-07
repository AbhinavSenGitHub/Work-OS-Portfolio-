import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Container, Eyebrow } from "./Section";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
  children,
  aside,
}: {
  crumbs: { name: string; path: string }[];
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="glow-top pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative pb-14 pt-10 sm:pb-20 sm:pt-14">
        <Breadcrumbs items={crumbs} />
        <div className={aside ? "mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]" : "mt-10 max-w-3xl"}>
          <div>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 id="page-title" className="mt-4 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-gradient sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {lede && <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">{lede}</p>}
            {children}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}
