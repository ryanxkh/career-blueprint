import { anthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages } from "ai";

export const maxDuration = 120;

export async function POST(req: Request) {
  const { messages, system } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system,
    messages: modelMessages,
    maxOutputTokens: 4096,
  });

  return result.toUIMessageStreamResponse();
}
