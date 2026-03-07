import { anthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages } from "ai";
import { auth } from "@/auth";
import { addMessage, getMessageCount, getSessionById } from "@/lib/db/queries";

export const maxDuration = 120;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages, system, sessionId } = await req.json();

  if (!sessionId) {
    return new Response("sessionId is required", { status: 400 });
  }

  // Verify session ownership
  const coachingSession = await getSessionById(sessionId, session.user.id);
  if (!coachingSession) {
    return new Response("Session not found", { status: 404 });
  }

  // Persist the user message before calling Claude
  const lastUserMessage = messages[messages.length - 1];
  if (lastUserMessage?.role === "user") {
    const userContent =
      typeof lastUserMessage.content === "string"
        ? lastUserMessage.content
        : lastUserMessage.parts
            ?.filter(
              (p: { type: string; text?: string }) => p.type === "text"
            )
            .map((p: { text: string }) => p.text)
            .join("") ?? "";

    const count = await getMessageCount(sessionId);
    await addMessage(sessionId, "user", userContent, count);
  }

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system,
    messages: modelMessages,
    maxOutputTokens: 4096,
    async onFinish({ text }) {
      // Persist the assistant message after streaming completes
      const count = await getMessageCount(sessionId);
      await addMessage(sessionId, "assistant", text, count);
    },
  });

  return result.toUIMessageStreamResponse();
}
