import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export const maxDuration = 120;

export async function POST(req: Request) {
  const { messages, system } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system,
    messages,
    maxOutputTokens: 4096,
  });

  return result.toUIMessageStreamResponse();
}
