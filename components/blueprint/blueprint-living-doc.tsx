"use client";

import { useBlueprintContext } from "./blueprint-provider";

export function BlueprintLivingDoc() {
  const { lastReviewed, markReviewed } = useBlueprintContext();

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
