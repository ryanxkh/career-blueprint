import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getSessionById,
  updateSession,
  deleteSession,
  getMessagesBySessionId,
} from "@/lib/db/queries";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId } = await params;
  const coachingSession = await getSessionById(sessionId, session.user.id);
  if (!coachingSession) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const messages = await getMessagesBySessionId(sessionId, session.user.id);

  return NextResponse.json({
    ...coachingSession,
    messages: messages ?? [],
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId } = await params;
  const body = await req.json();
  const allowed: { title?: string; phase?: number; isComplete?: boolean } = {};
  if (typeof body.title === "string") allowed.title = body.title;
  if (typeof body.phase === "number") allowed.phase = body.phase;
  if (typeof body.isComplete === "boolean") allowed.isComplete = body.isComplete;
  const updated = await updateSession(sessionId, session.user.id, allowed);

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionId } = await params;
  await deleteSession(sessionId, session.user.id);
  return NextResponse.json({ success: true });
}
