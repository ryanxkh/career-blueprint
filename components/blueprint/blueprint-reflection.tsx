"use client";

import { useBlueprintContext } from "./blueprint-provider";

const FIELDS = [
  { key: "whyMatters" as const, label: "Why These Goals Matter" },
  { key: "tradeoffs" as const, label: "Key Trade-offs Acknowledged" },
  { key: "constraints" as const, label: "Constraints Honored" },
  { key: "confidence" as const, label: "Confidence Check" },
  { key: "accountability" as const, label: "Accountability" },
];

export function BlueprintReflection() {
  const { blueprint } = useBlueprintContext();
  if (!blueprint) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Reflection & Alignment</h2>
      <div className="space-y-3">
        {FIELDS.map(({ key, label }) => {
          const text = blueprint.reflection[key];
          if (!text) return null;

          return (
            <div
              key={key}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                {label}
              </h3>
              <p className="text-sm leading-relaxed">{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
