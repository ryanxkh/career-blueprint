import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { getBlueprintsByUserId } from "@/lib/db/queries";
import { BlueprintClient } from "./blueprint-client";
import type { Blueprint, DesiredSkillState } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blueprint",
  description: "View and track your personalized Career Blueprint.",
};

export default async function BlueprintPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const { id: blueprintId } = await searchParams;

  const allBlueprints = await getBlueprintsByUserId(session.user.id);

  if (blueprintId) {
    const bp = allBlueprints.find((b) => b.id === blueprintId);
    if (!bp) redirect("/blueprint");

    return (
      <BlueprintClient
        blueprintId={bp.id}
        initialBlueprint={bp.data as Blueprint}
        initialSkillProgress={bp.skillProgress as DesiredSkillState[]}
        initialLastReviewed={bp.lastReviewed?.toISOString() ?? null}
      />
    );
  }

  // No ID — show the most recent blueprint, or empty state
  if (allBlueprints.length > 0) {
    const bp = allBlueprints[0];
    return (
      <BlueprintClient
        blueprintId={bp.id}
        initialBlueprint={bp.data as Blueprint}
        initialSkillProgress={bp.skillProgress as DesiredSkillState[]}
        initialLastReviewed={bp.lastReviewed?.toISOString() ?? null}
      />
    );
  }

  // No blueprints — show empty state (pass no props)
  return <BlueprintClient />;
}
