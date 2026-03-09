"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { COACHING_PHASES } from "@/lib/types";

interface SessionData {
  id: string;
  title: string;
  phase: number;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function SessionList({ sessions }: { sessions: SessionData[] }) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  async function handleDelete(sessionId: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (confirmId !== sessionId) {
      setConfirmId(sessionId);
      return;
    }

    setDeleting(sessionId);
    await fetch(`/api/sessions/${sessionId}`, { method: "DELETE" });
    setDeleting(null);
    setConfirmId(null);
    router.refresh();
  }

  useEffect(() => {
    if (!confirmId) return;
    function dismiss() { setConfirmId(null); }
    window.addEventListener("click", dismiss);
    return () => window.removeEventListener("click", dismiss);
  }, [confirmId]);

  async function handleNewSession() {
    setCreating(true);
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const session = await res.json();
    router.push(`/coach?session=${session.id}`);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Coaching Sessions</h1>
          <p className="mt-1 text-sm text-muted">
            Resume a session or start a new one.
          </p>
        </div>
        <button
          onClick={handleNewSession}
          disabled={creating}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
        >
          {creating ? "Creating..." : "New Session"}
        </button>
      </div>

      <div className="mt-8 space-y-3">
        {sessions.map((session) => {
          const phaseInfo = COACHING_PHASES[session.phase - 1];
          const updated = session.updatedAt;
          const timeAgo = formatTimeAgo(updated);

          return (
            <Link
              key={session.id}
              href={`/coach?session=${session.id}`}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
            >
              <div className="min-w-0 flex-1">
                <h2 className="font-medium truncate">{session.title}</h2>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    {session.isComplete ? (
                      <>
                        <span className="inline-block h-2 w-2 rounded-full bg-success" />
                        Complete
                      </>
                    ) : (
                      <>
                        <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                        Phase {session.phase}: {phaseInfo?.label}
                      </>
                    )}
                  </span>
                  <span>{timeAgo}</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={(e) => handleDelete(session.id, e)}
                  disabled={deleting === session.id}
                  className={`rounded-lg p-2 transition-colors ${
                    confirmId === session.id
                      ? "bg-red-500/15 text-red-400 hover:bg-red-500/25"
                      : "text-muted hover:bg-white/5 hover:text-foreground"
                  } disabled:opacity-50`}
                  title={confirmId === session.id ? "Click again to confirm" : "Delete session"}
                >
                  {deleting === session.id ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  )}
                </button>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
