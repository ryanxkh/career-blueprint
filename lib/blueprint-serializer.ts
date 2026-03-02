import type { Blueprint } from "./types";

/**
 * Serializes a Blueprint object back to markdown format.
 * Used for the "Export as Markdown" feature.
 */
export function serializeBlueprint(bp: Blueprint): string {
  const lines: string[] = [];

  lines.push(`# Career Blueprint — ${bp.name}`);
  lines.push("");

  // Goals
  lines.push("## Career Goals");
  lines.push("");
  lines.push(`**1-Year Goal:**`);
  lines.push(bp.goals.oneYear);
  lines.push("");
  lines.push(`**3-Year Goal:**`);
  lines.push(bp.goals.threeYear);
  lines.push("");
  lines.push(`**5-Year Goal:**`);
  lines.push(bp.goals.fiveYear);
  lines.push("");
  lines.push(`**10-15 Year Goal:**`);
  lines.push(bp.goals.tenFifteenYear);
  lines.push("");
  lines.push(`**Ultimate Goal:**`);
  lines.push(bp.goals.ultimate);
  lines.push("");
  lines.push("---");
  lines.push("");

  // Skills
  lines.push("## Skills");
  lines.push("");
  lines.push("### Current Skills:");
  lines.push("");
  for (const cat of bp.skills.current) {
    lines.push(`**${cat.category}**`);
    for (const skill of cat.skills) {
      if (skill.evidence) {
        lines.push(
          `- ${skill.name} — *Demonstrated through: ${skill.evidence}*`
        );
      } else {
        lines.push(`- ${skill.name}`);
      }
    }
    lines.push("");
  }

  lines.push("### Desired Skills:");
  lines.push("");
  for (const cat of bp.skills.desired) {
    lines.push(`**${cat.category}**`);
    for (const skill of cat.skills) {
      if (skill.purpose) {
        lines.push(`- ${skill.name} — *Needed for: ${skill.purpose}*`);
      } else {
        lines.push(`- ${skill.name}`);
      }
    }
    lines.push("");
  }

  lines.push("---");
  lines.push("");

  // Next Steps
  lines.push("## Next Steps");
  lines.push("");
  lines.push(`**Next Step Category:** ${bp.nextSteps.category}`);
  lines.push("");
  lines.push("### Immediate Actions (This Week):");
  for (const action of bp.nextSteps.immediateActions) {
    const check = action.completed ? "x" : " ";
    lines.push(`- [${check}] ${action.text}`);
  }
  lines.push("");

  lines.push("### Milestone Tracker:");
  lines.push("");
  lines.push("| Due Date | Status | Milestone | Success Criteria |");
  lines.push("|----------|---------|-----------|------------------|");
  for (const m of bp.nextSteps.milestones) {
    const criteria = m.successCriteria.map((c) => `• ${c}`).join("<br>");
    lines.push(`| ${m.dueDate} | ${m.status} | ${m.milestone} | ${criteria} |`);
  }
  lines.push("");
  lines.push("---");
  lines.push("");

  // Reflection
  lines.push("## Reflection & Alignment");
  lines.push("");
  lines.push("**Why These Goals Matter:**");
  lines.push(bp.reflection.whyMatters);
  lines.push("");
  lines.push("**Key Trade-offs Acknowledged:**");
  lines.push(bp.reflection.tradeoffs);
  lines.push("");
  lines.push("**Constraints Honored:**");
  lines.push(bp.reflection.constraints);
  lines.push("");
  lines.push("**Confidence Check:**");
  lines.push(bp.reflection.confidence);
  lines.push("");
  lines.push("**Accountability:**");
  lines.push(bp.reflection.accountability);

  return lines.join("\n");
}
