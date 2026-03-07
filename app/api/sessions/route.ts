import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getSessionsByUserId, createSession } from "@/lib/db/queries";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sessions = await getSessionsByUserId(session.user.id);
  return NextResponse.json(sessions);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const coachingSession = await createSession(
    session.user.id,
    body.title
  );
  return NextResponse.json(coachingSession, { status: 201 });
}
