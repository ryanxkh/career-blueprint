import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getBlueprintById, updateBlueprint } from "@/lib/db/queries";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ blueprintId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { blueprintId } = await params;
  const blueprint = await getBlueprintById(blueprintId, session.user.id);
  if (!blueprint) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(blueprint);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ blueprintId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { blueprintId } = await params;
  const body = await req.json();
  const updated = await updateBlueprint(blueprintId, session.user.id, body);

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
