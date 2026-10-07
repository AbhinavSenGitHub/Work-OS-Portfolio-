"use client";

import { useState } from "react";
import { Launcher, ThemeScope } from "@/components/island/Island";
import { PulseList } from "@/components/island/PulseList";
import { siteTheme } from "@/lib/themes";

/** The launcher with a count; press it to expand the list of signals. */
export function PulseDemo() {
  const [open, setOpen] = useState(true);
  return (
    <ThemeScope theme={siteTheme.tokens} wallpaper className="overflow-hidden rounded-[28px] border border-line-2 p-5 sm:p-8">
      <div className="flex flex-col items-center gap-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="pulse-list"
          className="rounded-xl p-2"
          aria-label={open ? "Collapse attention list" : "Expand attention list"}
        >
          <Launcher state="critical" count={3} large />
        </button>
        {open && (
          <div id="pulse-list" className="wi-enter wi-panel w-full max-w-[440px] p-3">
            <p className="wi-label" style={{ padding: "4px 6px 8px" }}>Needs you</p>
            <PulseList />
          </div>
        )}
        <p className="text-center text-xs text-white/50">Illustration. Items marked Planned are not in the current version.</p>
      </div>
    </ThemeScope>
  );
}
