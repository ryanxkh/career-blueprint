import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import {
  getSessionsByUserId,
  getSessionById,
  getMessagesBySessionId,
  createSession,
} from "@/lib/db/queries";
import { CoachClient } from "./coach-client";
import { SessionList } from "./session-list";

export const metadata: Metadata = {
  title: "Coach",
  description:
    "Start a live coaching session to build your personalized Career Blueprint.",
};

export default async function CoachPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const authSession = await auth();
  if (!authSession?.user?.id) {
    redirect("/sign-in");
  }

  const { session: sessionId } = await searchParams;
  const promptPath = path.join(process.cwd(), "system-prompt.md");
  const systemPrompt = await fs.readFile(promptPath, "utf-8");

  // If a session ID is provided, load that session
  if (sessionId) {
    const coachingSession = await getSessionById(
      sessionId,
      authSession.user.id
    );
    if (!coachingSession) {
      redirect("/coach");
    }

    const messages = await getMessagesBySessionId(
      sessionId,
      authSession.user.id
    );

    const initialMessages = messages
      ? messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }))
      : [];

    return (
      <CoachClient
        systemPrompt={systemPrompt}
        sessionId={sessionId}
        initialMessages={initialMessages}
      />
    );
  }

  // No session ID — check if user has sessions
  const sessions = await getSessionsByUserId(authSession.user.id);

  if (sessions.length === 0) {
    // No sessions at all — create one and redirect
    const newSession = await createSession(authSession.user.id);
    redirect(`/coach?session=${newSession.id}`);
  }

  // Has sessions — show the list
  return <SessionList sessions={sessions} />;
}
