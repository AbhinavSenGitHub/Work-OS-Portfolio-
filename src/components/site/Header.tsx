"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { DownloadButton } from "./Download";

const LINKS = [
  { href: "/#product", label: "Product" },
  { href: "/features", label: "Features" },
  { href: "/themes", label: "Themes" },
  { href: "/workspaces", label: "Workspaces" },
  { href: "/#developers", label: "Developers" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu on navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="WorkOS home" className="rounded-lg">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="rounded-full px-3 py-2 text-sm text-muted transition hover:text-fg aria-[current=page]:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <DownloadButton label="Download" />
          </div>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line-2 text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2.5 5h13M2.5 9h13M2.5 13h13" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-nav" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg md:hidden">
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 pb-6 pt-2">
            <ul className="divide-y divide-line">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="block py-4 text-lg text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <DownloadButton size="lg" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
