import { readFileSync } from "fs";

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSection(markdown, heading) {
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

const md = readFileSync("test-data/blueprint-import-test.md", "utf8");

const goals = getSection(md, "Career Goals");
const skills = getSection(md, "Skills");
const nextSteps = getSection(md, "Next Steps");
const reflection = getSection(md, "Reflection & Alignment");

console.log("Goals length:", goals.length, "| has 1-Year:", goals.includes("1-Year Goal"));
console.log("Skills length:", skills.length, "| has Current:", skills.includes("Current Skills"));
console.log("NextSteps length:", nextSteps.length, "| has Actions:", nextSteps.includes("Immediate Actions"));
console.log("Reflection length:", reflection.length, "| has Why:", reflection.includes("Why These Goals Matter"));
