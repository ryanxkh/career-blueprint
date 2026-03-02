"use client";

import { useBlueprintContext } from "./blueprint-provider";
import type { SkillProgress } from "@/lib/types";

const PROGRESS_OPTIONS: { value: SkillProgress; label: string; color: string }[] = [
  { value: "Not Started", label: "Not Started", color: "bg-zinc-200 dark:bg-zinc-700" },
  { value: "Learning", label: "Learning", color: "bg-warning-light text-warning" },
  { value: "Proficient", label: "Proficient", color: "bg-success-light text-success" },
];

export function BlueprintSkills() {
  const { blueprint, skillProgress, updateSkillProgress } = useBlueprintContext();
  if (!blueprint) return null;

  function getProgress(skillName: string): SkillProgress {
    return skillProgress.find((s) => s.name === skillName)?.progress ?? "Not Started";
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Skills</h2>

      <div className="space-y-6">
        {/* Current Skills */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
            Current Skills
          </h3>
          <div className="space-y-4">
            {blueprint.skills.current.map((cat) => (
              <div key={cat.category}>
                <h4 className="mb-2 text-sm font-medium">{cat.category}</h4>
                <div className="space-y-1.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-start gap-2 rounded-lg border border-border bg-card px-3 py-2"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-success"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{skill.name}</p>
                        {skill.evidence && (
                          <p className="text-xs text-muted">{skill.evidence}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desired Skills */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
            Desired Skills
          </h3>
          <div className="space-y-4">
            {blueprint.skills.desired.map((cat) => (
              <div key={cat.category}>
                <h4 className="mb-2 text-sm font-medium">{cat.category}</h4>
                <div className="space-y-1.5">
                  {cat.skills.map((skill) => {
                    const progress = getProgress(skill.name);

                    return (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{skill.name}</p>
                          {skill.purpose && (
                            <p className="text-xs text-muted">{skill.purpose}</p>
                          )}
                        </div>
                        <select
                          value={progress}
                          onChange={(e) =>
                            updateSkillProgress(
                              skill.name,
                              e.target.value as SkillProgress
                            )
                          }
                          className="shrink-0 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium outline-none focus:border-primary"
                        >
                          {PROGRESS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
