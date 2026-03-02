"use client";

import { useBlueprintContext } from "./blueprint-provider";
import type { MilestoneStatus } from "@/lib/types";

const STATUS_OPTIONS: { value: MilestoneStatus; color: string }[] = [
  { value: "Not Started", color: "text-muted" },
  { value: "In Progress", color: "text-warning" },
  { value: "Completed", color: "text-success" },
  { value: "Deferred", color: "text-zinc-400" },
];

export function BlueprintMilestones() {
  const { blueprint, toggleAction, updateMilestoneStatus } = useBlueprintContext();
  if (!blueprint) return null;

  const { nextSteps } = blueprint;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Next Steps</h2>

      <div className="mb-2 inline-block rounded-md bg-card border border-border px-3 py-1 text-xs font-medium text-muted">
        {nextSteps.category}
      </div>

      {/* Immediate Actions */}
      <div className="mt-4">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
          Immediate Actions (This Week)
        </h3>
        <div className="space-y-2">
          {nextSteps.immediateActions.map((action, i) => (
            <label
              key={i}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card px-3 py-2.5 transition-colors hover:border-primary/30"
            >
              <input
                type="checkbox"
                checked={action.completed}
                onChange={() => toggleAction(i)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-primary"
              />
              <span
                className={`text-sm ${action.completed ? "text-muted line-through" : ""}`}
              >
                {action.text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Milestone Tracker */}
      <div className="mt-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
          Milestone Tracker
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Due Date
                </th>
                <th className="pb-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Status
                </th>
                <th className="pb-2 pr-4 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Milestone
                </th>
                <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-muted">
                  Success Criteria
                </th>
              </tr>
            </thead>
            <tbody>
              {nextSteps.milestones.map((m, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 pr-4 font-mono text-xs whitespace-nowrap">
                    {m.dueDate}
                  </td>
                  <td className="py-3 pr-4">
                    <select
                      value={m.status}
                      onChange={(e) =>
                        updateMilestoneStatus(
                          i,
                          e.target.value as MilestoneStatus
                        )
                      }
                      className={`rounded-md border border-border bg-background px-2 py-1 text-xs font-medium outline-none focus:border-primary ${
                        STATUS_OPTIONS.find((s) => s.value === m.status)
                          ?.color ?? ""
                      }`}
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.value}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 pr-4 text-sm">{m.milestone}</td>
                  <td className="py-3">
                    <ul className="space-y-0.5">
                      {m.successCriteria.map((c, j) => (
                        <li key={j} className="text-xs text-muted">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
