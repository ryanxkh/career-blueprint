import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";
import { CoachClient } from "./coach-client";

export const metadata: Metadata = {
  title: "Coach",
  description:
    "Start a live coaching session to build your personalized Career Blueprint.",
};

export default async function CoachPage() {
  const promptPath = path.join(process.cwd(), "system-prompt.md");
  const systemPrompt = await fs.readFile(promptPath, "utf-8");

  return <CoachClient systemPrompt={systemPrompt} />;
}
