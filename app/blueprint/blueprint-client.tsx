"use client";

import Link from "next/link";
import {
  BlueprintProvider,
  useBlueprintContext,
  BlueprintGoals,
  BlueprintSkills,
  BlueprintMilestones,
  BlueprintReflection,
  BlueprintLivingDoc,
} from "@/components/blueprint";
import { serializeBlueprint } from "@/lib/blueprint-serializer";
import type { Blueprint, DesiredSkillState } from "@/lib/types";

interface BlueprintClientProps {
  blueprintId?: string;
  initialBlueprint?: Blueprint;
  initialSkillProgress?: DesiredSkillState[];
  initialLastReviewed?: string | null;
}

export function BlueprintClient({
  blueprintId,
  initialBlueprint,
  initialSkillProgress,
  initialLastReviewed,
}: BlueprintClientProps = {}) {
  return (
    <BlueprintProvider
      blueprintId={blueprintId}
      initialBlueprint={initialBlueprint ?? null}
      initialSkillProgress={initialSkillProgress ?? []}
      initialLastReviewed={initialLastReviewed ?? null}
    >
      <BlueprintContent />
    </BlueprintProvider>
  );
}

function BlueprintContent() {
  const { blueprint, saveError } = useBlueprintContext();

  if (!blueprint) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">No Blueprint Found</h1>
        <p className="max-w-md text-muted">
          Complete a coaching session to generate your Career Blueprint, or
          import an existing one.
        </p>
        <div className="flex gap-3">
          <Link
            href="/coach"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Start Coaching
          </Link>
          <Link
            href="/import"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary/30"
          >
            Import Blueprint
          </Link>
        </div>
      </div>
    );
  }

  function handleExport() {
    if (!blueprint) return;
    const markdown = serializeBlueprint(blueprint);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `career-blueprint-${blueprint.name.toLowerCase().replace(/\s+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Career Blueprint — {blueprint.name}
          </h1>
          <p className="mt-1 text-sm text-muted">
            Your personalized career development plan
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:border-primary/30"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export Markdown
        </button>
      </div>

      <BlueprintLivingDoc />

      {saveError && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          Changes couldn&apos;t be saved. Check your connection and try again.
        </div>
      )}

      <div className="mt-8 space-y-10">
        <BlueprintGoals />
        <BlueprintSkills />
        <BlueprintMilestones />
        <BlueprintReflection />
      </div>
    </div>
  );
}
