// ── Blueprint Data Model ──

export interface Blueprint {
  name: string;
  goals: BlueprintGoals;
  skills: BlueprintSkills;
  nextSteps: BlueprintNextSteps;
  reflection: BlueprintReflection;
  meta: BlueprintMeta;
}

export interface BlueprintGoals {
  oneYear: string;
  threeYear: string;
  fiveYear: string;
  tenFifteenYear: string;
  ultimate: string;
}

export interface Skill {
  name: string;
  evidence: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface DesiredSkill {
  name: string;
  purpose: string;
}

export interface DesiredSkillCategory {
  category: string;
  skills: DesiredSkill[];
}

export interface BlueprintSkills {
  current: SkillCategory[];
  desired: DesiredSkillCategory[];
}

export interface Action {
  text: string;
  completed: boolean;
}

export type MilestoneStatus =
  | "Not Started"
  | "In Progress"
  | "Completed"
  | "Deferred";

export interface Milestone {
  dueDate: string;
  status: MilestoneStatus;
  milestone: string;
  successCriteria: string[];
}

export interface BlueprintNextSteps {
  category: string;
  immediateActions: Action[];
  milestones: Milestone[];
}

export interface BlueprintReflection {
  whyMatters: string;
  tradeoffs: string;
  constraints: string;
  confidence: string;
  accountability: string;
}

export interface BlueprintMeta {
  lastReviewed: string | null;
  createdAt: string;
}

// ── Skill Progress (user-tracked) ──

export type SkillProgress = "Not Started" | "Learning" | "Proficient";

export interface DesiredSkillState {
  name: string;
  progress: SkillProgress;
}

// ── Chat Phase Tracking ──

export type CoachingPhase = 1 | 2 | 3 | 4 | 5;

export interface PhaseInfo {
  phase: CoachingPhase;
  label: string;
  description: string;
}

export const COACHING_PHASES: PhaseInfo[] = [
  {
    phase: 1,
    label: "Understanding",
    description: "Document analysis & context building",
  },
  {
    phase: 2,
    label: "Discovery",
    description: "Strategic questioning across 3 areas",
  },
  {
    phase: 3,
    label: "Skills",
    description: "Evidence-based skills assessment",
  },
  {
    phase: 4,
    label: "Goals",
    description: "Goal articulation & synthesis",
  },
  {
    phase: 5,
    label: "Action Plan",
    description: "Next steps & milestones",
  },
];
