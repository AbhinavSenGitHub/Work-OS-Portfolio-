"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Steps through `length` states on an interval. Stops when the user prefers
 * reduced motion, when paused, or when the element is off-screen.
 */
export function useCycle(length: number, ms: number, visible = true) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const running = !reduced && !paused && visible;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % length), ms);
    return () => window.clearInterval(id);
  }, [running, length, ms]);

  return { index, setIndex, paused: paused || reduced, setPaused, reduced };
}

/** True while the element is at least partly in the viewport. */
export function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}
