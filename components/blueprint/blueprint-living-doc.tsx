"use client";

import { useState } from "react";
import { useBlueprintContext } from "./blueprint-provider";

export function BlueprintLivingDoc() {
  const { lastReviewed, markReviewed } = useBlueprintContext();
  const [showTip, setShowTip] = useState(false);

  const formattedDate = lastReviewed
    ? new Date(lastReviewed).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
      <div className="flex items-center gap-2 text-sm">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-muted">
          {formattedDate
            ? `Last reviewed: ${formattedDate}`
            : "Not yet reviewed"}
        </span>
        <div className="relative">
          <button
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
            onClick={() => setShowTip((prev) => !prev)}
            className="rounded-full p-0.5 text-muted transition-colors hover:text-foreground"
            aria-label="What is this?"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>
          {showTip && (
            <div className="absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-lg border border-border bg-card p-3 text-xs leading-relaxed text-muted shadow-lg">
              Your blueprint is a living document. Come back periodically to
              review your goals, milestones, and progress, then mark it as
              reviewed so you can track how recently you engaged with your plan.
              <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-border" />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={markReviewed}
        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-card hover:border-primary/30"
      >
        Mark as Reviewed
      </button>
    </div>
  );
}
