import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getBlueprintsByUserId, createBlueprint } from "@/lib/db/queries";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bps = await getBlueprintsByUserId(session.user.id);
  return NextResponse.json(bps);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  if (!body.name || !body.data) {
    return NextResponse.json(
      { error: "name and data are required" },
      { status: 400 }
    );
  }

  const blueprint = await createBlueprint(
    session.user.id,
    body.name,
    body.data,
    body.sessionId
  );

  return NextResponse.json(blueprint, { status: 201 });
}
