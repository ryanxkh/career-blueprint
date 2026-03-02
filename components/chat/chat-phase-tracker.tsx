"use client";

import { useChatContext } from "./chat-provider";
import { COACHING_PHASES } from "@/lib/types";
import Link from "next/link";

export function ChatPhaseTracker() {
  const { currentPhase, blueprintReady } = useChatContext();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
        Coaching Progress
      </h2>

      <div className="space-y-3">
        {COACHING_PHASES.map(({ phase, label, description }) => {
          const isActive = phase === currentPhase;
          const isCompleted = phase < currentPhase;

          return (
            <div key={phase} className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                  isCompleted
                    ? "bg-success text-white"
                    : isActive
                      ? "bg-primary text-white"
                      : "border border-border text-muted"
                }`}
              >
                {isCompleted ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  phase
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${
                    isActive ? "text-foreground" : "text-muted"
                  }`}
                >
                  {label}
                </p>
                <p className="text-xs text-muted">{description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {blueprintReady && (
        <Link
          href="/blueprint"
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-success px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-success/90"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          View Your Blueprint
        </Link>
      )}
    </div>
  );
}
