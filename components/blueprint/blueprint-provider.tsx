"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type {
  Blueprint,
  Action,
  MilestoneStatus,
  DesiredSkillState,
  SkillProgress,
} from "@/lib/types";
import {
  getBlueprint,
  saveBlueprint,
  getSkillProgress,
  saveSkillProgress,
  getLastReviewed,
  setLastReviewed,
} from "@/lib/storage";

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

export function BlueprintProvider({ children }: { children: React.ReactNode }) {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [skillProgress, setSkillProgressState] = useState<DesiredSkillState[]>([]);
  const [lastReviewedDate, setLastReviewedDate] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    setBlueprint(getBlueprint());
    setSkillProgressState(getSkillProgress());
    setLastReviewedDate(getLastReviewed());
  }, []);

  const toggleAction = useCallback(
    (index: number) => {
      if (!blueprint) return;
      const updated = { ...blueprint };
      const actions = [...updated.nextSteps.immediateActions];
      actions[index] = { ...actions[index], completed: !actions[index].completed };
      updated.nextSteps = { ...updated.nextSteps, immediateActions: actions };
      setBlueprint(updated);
      saveBlueprint(updated);
    },
    [blueprint]
  );

  const updateMilestoneStatus = useCallback(
    (index: number, status: MilestoneStatus) => {
      if (!blueprint) return;
      const updated = { ...blueprint };
      const milestones = [...updated.nextSteps.milestones];
      milestones[index] = { ...milestones[index], status };
      updated.nextSteps = { ...updated.nextSteps, milestones };
      setBlueprint(updated);
      saveBlueprint(updated);
    },
    [blueprint]
  );

  const updateSkillProgressFn = useCallback(
    (skillName: string, progress: SkillProgress) => {
      setSkillProgressState((prev) => {
        const existing = prev.findIndex((s) => s.name === skillName);
        const next =
          existing >= 0
            ? prev.map((s, i) => (i === existing ? { ...s, progress } : s))
            : [...prev, { name: skillName, progress }];
        saveSkillProgress(next);
        return next;
      });
    },
    []
  );

  const markReviewed = useCallback(() => {
    const now = new Date().toISOString();
    setLastReviewedDate(now);
    setLastReviewed(now);
  }, []);

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
