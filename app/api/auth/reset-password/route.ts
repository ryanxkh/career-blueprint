import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { hash } from "bcryptjs";
import {
  getPasswordResetToken,
  deletePasswordResetToken,
  updateUserPassword,
} from "@/lib/db/queries";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing reset token." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const tokenHash = createHash("sha256").update(token).digest("hex");
    const resetToken = await getPasswordResetToken(tokenHash);

    if (!resetToken) {
      return NextResponse.json(
        { error: "Invalid or expired reset link. Please request a new one." },
        { status: 400 }
      );
    }

    if (new Date() > resetToken.expiresAt) {
      await deletePasswordResetToken(resetToken.id);
      return NextResponse.json(
        { error: "This reset link has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const passwordHash = await hash(password, 12);
    await updateUserPassword(resetToken.userId, passwordHash);
    await deletePasswordResetToken(resetToken.id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
