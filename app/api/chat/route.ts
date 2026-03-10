import { anthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages } from "ai";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { addMessage, getMessageCount, getSessionById } from "@/lib/db/queries";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 120;

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const { allowed } = rateLimit(`chat:${session.user.id}`, { windowMs: 60_000, maxRequests: 20 });
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { messages, system, sessionId } = body;

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages are required" }, { status: 400 });
    }

    // Verify session ownership
    const coachingSession = await getSessionById(sessionId, session.user.id);
    if (!coachingSession) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
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
      model: anthropic(process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514"),
      system,
      messages: modelMessages,
      maxOutputTokens: 4096,
      async onFinish({ text }) {
        try {
          const count = await getMessageCount(sessionId);
          await addMessage(sessionId, "assistant", text, count);
        } catch {
          // Message persistence failed — not ideal but don't break the stream
        }
      },
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
