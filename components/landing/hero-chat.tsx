"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  {
    role: "coach" as const,
    text: "What does career success look like for you in the next year?",
  },
  {
    role: "user" as const,
    text: "I want to lead a cross-functional product team and ship our v2.0 launch by Q3.",
  },
  {
    role: "coach" as const,
    text: "That\u2019s specific and measurable. What skills would you need to develop?",
  },
];

/**
 * Animated chat mockup for the hero section.
 * Messages appear one-by-one with typing indicators for coach messages.
 *
 * Timeline (ms from mount):
 *   800  — typing dots
 *   2000 — coach message 1
 *   3200 — user message
 *   4400 — typing dots
 *   5600 — coach message 2
 *   6800 — blueprint preview
 */
export function HeroChat() {
  // step 0: empty, 1: typing, 2: msg1, 3: msg2, 4: typing, 5: msg3, 6: blueprint
  const [step, setStep] = useState(0);

  useEffect(() => {
    const schedule = [800, 2000, 3200, 4400, 5600, 6800];
    const timers = schedule.map((delay, i) =>
      setTimeout(() => setStep(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="space-y-3 p-5">
      {/* Coach message 1 */}
      {step >= 2 && (
        <div className="chat-msg flex gap-2.5">
          <CoachAvatar />
          <CoachBubble>{MESSAGES[0].text}</CoachBubble>
        </div>
      )}

      {/* Typing indicator (before msg1) */}
      {step === 1 && <TypingIndicator />}

      {/* User message */}
      {step >= 3 && (
        <div className="chat-msg flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2 text-[13px] leading-relaxed text-white">
            {MESSAGES[1].text}
          </div>
        </div>
      )}

      {/* Typing indicator (before msg3) */}
      {step === 4 && <TypingIndicator />}

      {/* Coach message 2 */}
      {step >= 5 && (
        <div className="chat-msg flex gap-2.5">
          <CoachAvatar />
          <CoachBubble>{MESSAGES[2].text}</CoachBubble>
        </div>
      )}

      {/* Blueprint preview generating */}
      {step >= 6 && (
        <div className="chat-msg mt-2 rounded-xl border border-primary/20 bg-primary/5 p-3.5">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Generating Your Blueprint
          </div>
          <div className="mt-2.5 space-y-1.5">
            <BlueprintRow label="1-YEAR GOAL" text="Lead cross-functional product team, ship v2.0" />
            <BlueprintRow label="KEY SKILL GAP" text="People leadership — 6/10 current, 8/10 target" />
          </div>
        </div>
      )}
    </div>
  );
}

function CoachAvatar() {
  return (
    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
      C
    </div>
  );
}

function CoachBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl rounded-tl-sm bg-stone-100 px-3.5 py-2 text-[13px] leading-relaxed dark:bg-stone-800">
      {children}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="chat-msg flex gap-2.5">
      <CoachAvatar />
      <div className="rounded-2xl bg-stone-100 px-4 py-3 dark:bg-stone-800">
        <div className="flex gap-1">
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-stone-400" />
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-stone-400" style={{ animationDelay: "150ms" }} />
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-stone-400" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

function BlueprintRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded bg-white/60 px-2.5 py-1.5 dark:bg-stone-800/60">
      <span className="text-[10px] font-medium text-primary">{label}</span>
      <p className="text-[11px] leading-snug text-foreground">{text}</p>
    </div>
  );
}
