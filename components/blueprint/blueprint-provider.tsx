"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type {
  Blueprint,
  MilestoneStatus,
  DesiredSkillState,
  SkillProgress,
} from "@/lib/types";

interface BlueprintContextValue {
  blueprint: Blueprint | null;
  skillProgress: DesiredSkillState[];
  lastReviewed: string | null;
  toggleAction: (index: number) => void;
  updateMilestoneStatus: (index: number, status: MilestoneStatus) => void;
  updateSkillProgress: (skillName: string, progress: SkillProgress) => void;
  markReviewed: () => void;
}

const BlueprintContext = createContext<BlueprintContextValue | null>(null);

export function useBlueprintContext() {
  const ctx = useContext(BlueprintContext);
  if (!ctx) throw new Error("useBlueprintContext must be used within BlueprintProvider");
  return ctx;
}

interface BlueprintProviderProps {
  blueprintId?: string;
  initialBlueprint: Blueprint | null;
  initialSkillProgress: DesiredSkillState[];
  initialLastReviewed: string | null;
  children: React.ReactNode;
}

export function BlueprintProvider({
  blueprintId,
  initialBlueprint,
  initialSkillProgress,
  initialLastReviewed,
  children,
}: BlueprintProviderProps) {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(initialBlueprint);
  const [skillProgress, setSkillProgressState] = useState<DesiredSkillState[]>(initialSkillProgress);
  const [lastReviewedDate, setLastReviewedDate] = useState<string | null>(initialLastReviewed);

  // Persist changes to server
  function persistToServer(data: Record<string, unknown>) {
    if (!blueprintId) return;
    fetch(`/api/blueprints/${blueprintId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => {});
  }

  const toggleAction = useCallback(
    (index: number) => {
      if (!blueprint) return;
      const updated = { ...blueprint };
      const actions = [...updated.nextSteps.immediateActions];
      actions[index] = { ...actions[index], completed: !actions[index].completed };
      updated.nextSteps = { ...updated.nextSteps, immediateActions: actions };
      setBlueprint(updated);
      persistToServer({ data: updated });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blueprint, blueprintId]
  );

  const updateMilestoneStatus = useCallback(
    (index: number, status: MilestoneStatus) => {
      if (!blueprint) return;
      const updated = { ...blueprint };
      const milestones = [...updated.nextSteps.milestones];
      milestones[index] = { ...milestones[index], status };
      updated.nextSteps = { ...updated.nextSteps, milestones };
      setBlueprint(updated);
      persistToServer({ data: updated });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blueprint, blueprintId]
  );

  const updateSkillProgressFn = useCallback(
    (skillName: string, progress: SkillProgress) => {
      setSkillProgressState((prev) => {
        const existing = prev.findIndex((s) => s.name === skillName);
        const next =
          existing >= 0
            ? prev.map((s, i) => (i === existing ? { ...s, progress } : s))
            : [...prev, { name: skillName, progress }];
        persistToServer({ skillProgress: next });
        return next;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blueprintId]
  );

  const markReviewed = useCallback(() => {
    const now = new Date().toISOString();
    setLastReviewedDate(now);
    persistToServer({ lastReviewed: now });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blueprintId]);

  return (
    <BlueprintContext.Provider
      value={{
        blueprint,
        skillProgress,
        lastReviewed: lastReviewedDate,
        toggleAction,
        updateMilestoneStatus,
        updateSkillProgress: updateSkillProgressFn,
        markReviewed,
      }}
    >
      {children}
    </BlueprintContext.Provider>
  );
}
