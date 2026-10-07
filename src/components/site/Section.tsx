import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  align = "center",
  as: H = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H id={id} className="mt-3 text-balance text-3xl font-semibold tracking-tight text-gradient sm:text-4xl md:text-[44px] md:leading-[1.1]">
        {title}
      </H>
      {lede && <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{lede}</p>}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}
