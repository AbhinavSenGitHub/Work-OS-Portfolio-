"use client";

import { useEffect } from "react";

/** Tells the page showing this embed how tall it is, so its iframe fits without scrolling. */
export function EmbedHeight() {
  useEffect(() => {
    const root = document.querySelector(".embed-root");
    if (window.parent === window || !root) return;
    // The demo's own height (the document is never shorter than the frame).
    const send = () =>
      window.parent.postMessage({ type: "workos-embed-height", height: Math.ceil(root.getBoundingClientRect().height) }, "*");
    const observer = new ResizeObserver(send);
    observer.observe(root);
    send();
    return () => observer.disconnect();
  }, []);
  return null;
}
