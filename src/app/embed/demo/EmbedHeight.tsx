"use client";

import { useEffect } from "react";

/** Tells the page showing this embed how tall it is, so its iframe fits without scrolling. */
export function EmbedHeight() {
  useEffect(() => {
    if (window.parent === window) return;
    const send = () =>
      window.parent.postMessage({ type: "workos-embed-height", height: Math.ceil(document.documentElement.scrollHeight) }, "*");
    const observer = new ResizeObserver(send);
    observer.observe(document.body);
    send();
    return () => observer.disconnect();
  }, []);
  return null;
}
