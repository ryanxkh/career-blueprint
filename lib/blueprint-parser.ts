import type {
  Blueprint,
  BlueprintGoals,
  BlueprintSkills,
  BlueprintNextSteps,
  BlueprintReflection,
  SkillCategory,
  DesiredSkillCategory,
  Action,
  Milestone,
  MilestoneStatus,
} from "./types";

/**
 * Parses a Career Blueprint markdown document into a typed Blueprint object.
 *
 * Expected format matches the output template from the v3.5 coaching prompt:
 * - "# Career Blueprint — [Name]"
 * - "## Career Goals" with **1-Year Goal:** etc.
 * - "## Skills" with ### Current Skills / ### Desired Skills
 * - "## Next Steps" with checkboxes and milestone table
 * - "## Reflection & Alignment" with bold-prefixed fields
 */
export function parseBlueprint(markdown: string): Blueprint {
  const name = parseName(markdown);
  const goals = parseGoals(markdown);
  const skills = parseSkills(markdown);
  const nextSteps = parseNextSteps(markdown);
  const reflection = parseReflection(markdown);

  return {
    name,
    goals,
    skills,
    nextSteps,
    reflection,
    meta: {
      lastReviewed: null,
      createdAt: new Date().toISOString(),
    },
  };
}

// ── Helpers ──

function getSection(markdown: string, heading: string): string {
  const startPattern = new RegExp(`^##\\s+${escapeRegex(heading)}`, "m");
  const startMatch = startPattern.exec(markdown);
  if (!startMatch) return "";

  const startIndex = startMatch.index;
  const afterHeading = markdown.slice(startIndex + startMatch[0].length);
  const nextHeadingMatch = afterHeading.match(/\n##\s/);

  if (!nextHeadingMatch || nextHeadingMatch.index === undefined) {
    return markdown.slice(startIndex);
  }

  return markdown.slice(
    startIndex,
    startIndex + startMatch[0].length + nextHeadingMatch.index
  );
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ── Name ──

function parseName(markdown: string): string {
  const match = markdown.match(/^#\s+Career Blueprint\s*—\s*(.+)$/m);
  return match ? match[1].trim() : "Unknown";
}

// ── Goals ──

function parseGoals(markdown: string): BlueprintGoals {
  const section = getSection(markdown, "Career Goals");

  return {
    oneYear: extractGoal(section, "1-Year Goal"),
    threeYear: extractGoal(section, "3-Year Goal"),
    fiveYear: extractGoal(section, "5-Year Goal"),
    tenFifteenYear: extractGoal(section, "10-15 Year Goal"),
    ultimate: extractGoal(section, "Ultimate Goal"),
  };
}

function extractGoal(section: string, label: string): string {
  // Match **Label:** followed by content until next **..Goal:** or section end
  const pattern = new RegExp(
    `\\*\\*${escapeRegex(label)}:\\*\\*\\s*\\n?([\\s\\S]*?)(?=\\n\\*\\*[^*]*Goal:\\*\\*|\\n---|$)`
  );
  const match = section.match(pattern);
  return match ? match[1].trim() : "";
}

// ── Skills ──

function parseSkills(markdown: string): BlueprintSkills {
  const section = getSection(markdown, "Skills");

  // Split into Current and Desired subsections
  const currentSection = extractSubsection(section, "Current Skills");
  const desiredSection = extractSubsection(section, "Desired Skills");

  return {
    current: parseSkillCategories(currentSection),
    desired: parseDesiredSkillCategories(desiredSection),
  };
}

function extractSubsection(section: string, heading: string): string {
  const startPattern = new RegExp(`^###\\s+${escapeRegex(heading)}:?`, "m");
  const startMatch = startPattern.exec(section);
  if (!startMatch) return "";

  const startIndex = startMatch.index;
  const afterHeading = section.slice(startIndex + startMatch[0].length);
  const nextSubheadingMatch = afterHeading.match(/\n###\s/);

  if (!nextSubheadingMatch || nextSubheadingMatch.index === undefined) {
    return section.slice(startIndex);
  }

  return section.slice(
    startIndex,
    startIndex + startMatch[0].length + nextSubheadingMatch.index
  );
}

function parseSkillCategories(section: string): SkillCategory[] {
  const categories: SkillCategory[] = [];
  // Match **Category Name** blocks
  const categoryPattern = /\*\*\[?([^\]*]+)\]?\*\*\s*\n([\s\S]*?)(?=\n\*\*\[?[^\]*]+\]?\*\*|\n###|$)/g;
  let match;

  while ((match = categoryPattern.exec(section)) !== null) {
    const category = match[1].trim();
    const skillsBlock = match[2];
    const skills = parseSkillItems(skillsBlock);
    if (skills.length > 0) {
      categories.push({ category, skills });
    }
  }

  return categories;
}

function parseSkillItems(block: string): { name: string; evidence: string }[] {
  const items: { name: string; evidence: string }[] = [];
  // Match "- Skill Name — *Demonstrated through: evidence*" or similar
  const linePattern =
    /^-\s+(.+?)(?:\s*—\s*\*(?:Demonstrated through|Evidence):\s*(.+?)\*)?$/gm;
  let match;

  while ((match = linePattern.exec(block)) !== null) {
    items.push({
      name: match[1].trim(),
      evidence: match[2]?.trim() ?? "",
    });
  }

  return items;
}

function parseDesiredSkillCategories(section: string): DesiredSkillCategory[] {
  const categories: DesiredSkillCategory[] = [];
  const categoryPattern = /\*\*\[?([^\]*]+)\]?\*\*\s*\n([\s\S]*?)(?=\n\*\*\[?[^\]*]+\]?\*\*|\n###|$)/g;
  let match;

  while ((match = categoryPattern.exec(section)) !== null) {
    const category = match[1].trim();
    const skillsBlock = match[2];
    const skills = parseDesiredSkillItems(skillsBlock);
    if (skills.length > 0) {
      categories.push({ category, skills });
    }
  }

  return categories;
}

function parseDesiredSkillItems(
  block: string
): { name: string; purpose: string }[] {
  const items: { name: string; purpose: string }[] = [];
  // Match "- Skill Name — *Needed for: purpose*" or similar
  const linePattern =
    /^-\s+(.+?)(?:\s*—\s*\*(?:Needed for|For):\s*(.+?)\*)?$/gm;
  let match;

  while ((match = linePattern.exec(block)) !== null) {
    items.push({
      name: match[1].trim(),
      purpose: match[2]?.trim() ?? "",
    });
  }

  return items;
}

// ── Next Steps ──

function parseNextSteps(markdown: string): BlueprintNextSteps {
  const section = getSection(markdown, "Next Steps");

  // Extract category
  const categoryMatch = section.match(
    /\*\*Next Step Category:\*\*\s*(.+?)$/m
  );
  const category = categoryMatch ? categoryMatch[1].trim() : "Hybrid";

  // Extract immediate actions (checkbox items)
  const actions = parseActions(section);

  // Extract milestone table
  const milestones = parseMilestoneTable(section);

  return { category, immediateActions: actions, milestones };
}

function parseActions(section: string): Action[] {
  const actions: Action[] = [];
  const pattern = /^-\s+\[([ xX])\]\s+(.+)$/gm;
  let match;

  while ((match = pattern.exec(section)) !== null) {
    actions.push({
      text: match[2].trim(),
      completed: match[1].toLowerCase() === "x",
    });
  }

  return actions;
}

function parseMilestoneTable(section: string): Milestone[] {
  const milestones: Milestone[] = [];

  // Find markdown table rows (skip header and separator)
  const tablePattern =
    /\|(.+?)\|(.+?)\|(.+?)\|(.+?)\|/g;
  const rows: string[][] = [];
  let match;

  while ((match = tablePattern.exec(section)) !== null) {
    const cells = [
      match[1].trim(),
      match[2].trim(),
      match[3].trim(),
      match[4].trim(),
    ];
    rows.push(cells);
  }

  // Skip header row (Due Date, Status, ...) and separator (---, ---, ...)
  const dataRows = rows.filter(
    (row) =>
      !row[0].startsWith("Due") &&
      !row[0].startsWith("---") &&
      !row[0].match(/^-+$/)
  );

  for (const row of dataRows) {
    const successCriteria = row[3]
      .split(/<br\s*\/?>|•/)
      .map((s) => s.trim())
      .filter(Boolean);

    milestones.push({
      dueDate: row[0],
      status: normalizeStatus(row[1]),
      milestone: row[2],
      successCriteria,
    });
  }

  return milestones;
}

function normalizeStatus(raw: string): MilestoneStatus {
  const lower = raw.toLowerCase().trim();
  if (lower.includes("progress")) return "In Progress";
  if (lower.includes("complete") || lower.includes("done")) return "Completed";
  if (lower.includes("defer")) return "Deferred";
  return "Not Started";
}

// ── Reflection ──

function parseReflection(markdown: string): BlueprintReflection {
  const section = getSection(markdown, "Reflection & Alignment");

  return {
    whyMatters: extractBoldField(section, "Why These Goals Matter"),
    tradeoffs: extractBoldField(section, "Key Trade-offs Acknowledged"),
    constraints: extractBoldField(section, "Constraints Honored"),
    confidence: extractBoldField(section, "Confidence Check"),
    accountability: extractBoldField(section, "Accountability"),
  };
}

function extractBoldField(section: string, label: string): string {
  const pattern = new RegExp(
    `\\*\\*${escapeRegex(label)}:\\*\\*\\s*\\n?([\\s\\S]*?)(?=\\n\\*\\*[^*]+:\\*\\*|$)`
  );
  const match = section.match(pattern);
  return match ? match[1].trim() : "";
}
