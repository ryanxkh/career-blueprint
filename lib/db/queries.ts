import { db } from ".";
import {
  users,
  coachingSessions,
  sessionMessages,
  blueprints,
} from "./schema";
import { eq, and, desc, asc } from "drizzle-orm";
import type { Blueprint, DesiredSkillState } from "@/lib/types";

// ── Users ──

export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user ?? null;
}

// ── Sessions ──

export async function getSessionsByUserId(userId: string) {
  return db
    .select()
    .from(coachingSessions)
    .where(eq(coachingSessions.userId, userId))
    .orderBy(desc(coachingSessions.updatedAt));
}

export async function getSessionById(sessionId: string, userId: string) {
  const [session] = await db
    .select()
    .from(coachingSessions)
    .where(
      and(
        eq(coachingSessions.id, sessionId),
        eq(coachingSessions.userId, userId)
      )
    )
    .limit(1);
  return session ?? null;
}

export async function createSession(userId: string, title?: string) {
  const id = crypto.randomUUID();
  const now = new Date();
  const [session] = await db
    .insert(coachingSessions)
    .values({
      id,
      userId,
      title: title || "New Session",
      createdAt: now,
      updatedAt: now,
    })
    .returning();
  return session;
}

export async function updateSession(
  sessionId: string,
  userId: string,
  data: { title?: string; phase?: number; isComplete?: boolean }
) {
  const [session] = await db
    .update(coachingSessions)
    .set({ ...data, updatedAt: new Date() })
    .where(
      and(
        eq(coachingSessions.id, sessionId),
        eq(coachingSessions.userId, userId)
      )
    )
    .returning();
  return session ?? null;
}

export async function deleteSession(sessionId: string, userId: string) {
  await db
    .delete(coachingSessions)
    .where(
      and(
        eq(coachingSessions.id, sessionId),
        eq(coachingSessions.userId, userId)
      )
    );
}

// ── Messages ──

export async function getMessagesBySessionId(
  sessionId: string,
  userId: string
) {
  // Verify session ownership
  const session = await getSessionById(sessionId, userId);
  if (!session) return null;

  return db
    .select()
    .from(sessionMessages)
    .where(eq(sessionMessages.sessionId, sessionId))
    .orderBy(asc(sessionMessages.orderIndex));
}

export async function addMessage(
  sessionId: string,
  role: "user" | "assistant",
  content: string,
  orderIndex: number
) {
  const id = crypto.randomUUID();
  const [message] = await db
    .insert(sessionMessages)
    .values({ id, sessionId, role, content, orderIndex })
    .returning();

  // Touch the session's updatedAt
  await db
    .update(coachingSessions)
    .set({ updatedAt: new Date() })
    .where(eq(coachingSessions.id, sessionId));

  return message;
}

export async function getMessageCount(sessionId: string) {
  const messages = await db
    .select({ id: sessionMessages.id })
    .from(sessionMessages)
    .where(eq(sessionMessages.sessionId, sessionId));
  return messages.length;
}

// ── Blueprints ──

export async function getBlueprintsByUserId(userId: string) {
  return db
    .select()
    .from(blueprints)
    .where(eq(blueprints.userId, userId))
    .orderBy(desc(blueprints.updatedAt));
}

export async function getBlueprintById(blueprintId: string, userId: string) {
  const [blueprint] = await db
    .select()
    .from(blueprints)
    .where(
      and(eq(blueprints.id, blueprintId), eq(blueprints.userId, userId))
    )
    .limit(1);
  return blueprint ?? null;
}

export async function createBlueprint(
  userId: string,
  name: string,
  data: Blueprint,
  sessionId?: string
) {
  const id = crypto.randomUUID();
  const now = new Date();
  const [blueprint] = await db
    .insert(blueprints)
    .values({
      id,
      userId,
      sessionId: sessionId || null,
      name,
      data,
      skillProgress: [],
      createdAt: now,
      updatedAt: now,
    })
    .returning();
  return blueprint;
}

export async function updateBlueprint(
  blueprintId: string,
  userId: string,
  data: {
    data?: Blueprint;
    skillProgress?: DesiredSkillState[];
    lastReviewed?: Date;
    name?: string;
  }
) {
  const [blueprint] = await db
    .update(blueprints)
    .set({ ...data, updatedAt: new Date() })
    .where(
      and(eq(blueprints.id, blueprintId), eq(blueprints.userId, userId))
    )
    .returning();
  return blueprint ?? null;
}
