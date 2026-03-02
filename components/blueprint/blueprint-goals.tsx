"use client";

import { useBlueprintContext } from "./blueprint-provider";

const GOAL_HORIZONS = [
  { key: "oneYear" as const, label: "1 Year", accent: "bg-blue-500" },
  { key: "threeYear" as const, label: "3 Years", accent: "bg-blue-600" },
  { key: "fiveYear" as const, label: "5 Years", accent: "bg-indigo-500" },
  { key: "tenFifteenYear" as const, label: "10-15 Years", accent: "bg-indigo-600" },
  { key: "ultimate" as const, label: "Ultimate", accent: "bg-purple-600" },
];

export function BlueprintGoals() {
  const { blueprint } = useBlueprintContext();
  if (!blueprint) return null;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Career Goals</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GOAL_HORIZONS.map(({ key, label, accent }) => {
          const text = blueprint.goals[key];
          if (!text) return null;

          return (
            <div
              key={key}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${accent}`} />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {label}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
