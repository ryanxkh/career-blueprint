import type { Blueprint, DesiredSkillState } from "./types";

const STORAGE_PREFIX = "career-blueprint:v1:";

const KEYS = {
  blueprint: `${STORAGE_PREFIX}blueprint`,
  skillProgress: `${STORAGE_PREFIX}skill-progress`,
  chatHistory: `${STORAGE_PREFIX}chat-history`,
  lastReviewed: `${STORAGE_PREFIX}last-reviewed`,
} as const;

function getItem<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ── Blueprint ──

export function getBlueprint(): Blueprint | null {
  return getItem<Blueprint>(KEYS.blueprint);
}

export function saveBlueprint(blueprint: Blueprint): void {
  setItem(KEYS.blueprint, blueprint);
}

export function clearBlueprint(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.blueprint);
  localStorage.removeItem(KEYS.skillProgress);
}

// ── Skill Progress ──

export function getSkillProgress(): DesiredSkillState[] {
  return getItem<DesiredSkillState[]>(KEYS.skillProgress) ?? [];
}

export function saveSkillProgress(progress: DesiredSkillState[]): void {
  setItem(KEYS.skillProgress, progress);
}

// ── Chat History ──

export interface StoredMessage {
  role: "user" | "assistant";
  content: string;
}

export function getChatHistory(): StoredMessage[] {
  return getItem<StoredMessage[]>(KEYS.chatHistory) ?? [];
}

export function saveChatHistory(messages: StoredMessage[]): void {
  setItem(KEYS.chatHistory, messages);
}

export function clearChatHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEYS.chatHistory);
}

// ── Last Reviewed ──

export function getLastReviewed(): string | null {
  return getItem<string>(KEYS.lastReviewed);
}

export function setLastReviewed(date: string): void {
  setItem(KEYS.lastReviewed, date);
}
