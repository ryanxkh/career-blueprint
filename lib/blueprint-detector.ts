/**
 * Detects whether a message contains a Career Blueprint output.
 *
 * The Blueprint always starts with "# Career Blueprint" and contains
 * the key structural sections. We check for the heading plus at least
 * two required sections to avoid false positives on partial output.
 */
export function containsBlueprint(text: string): boolean {
  const hasHeading = /^#\s+Career Blueprint/m.test(text);
  if (!hasHeading) return false;

  const requiredSections = [
    /^##\s+Career Goals/m,
    /^##\s+Skills/m,
    /^##\s+Next Steps/m,
  ];

  const matchCount = requiredSections.filter((re) => re.test(text)).length;
  return matchCount >= 2;
}

/**
 * Extracts the Blueprint markdown block from a message that may contain
 * both conversational text and the Blueprint output.
 *
 * Looks for the "# Career Blueprint" heading and captures everything
 * from that point to the end of the message (the Blueprint is always
 * the final output in the coaching conversation).
 */
export function extractBlueprintMarkdown(text: string): string | null {
  const match = text.match(/^(#\s+Career Blueprint\s*—.+)$/m);
  if (!match) return null;

  const startIndex = text.indexOf(match[0]);
  return text.slice(startIndex).trim();
}
