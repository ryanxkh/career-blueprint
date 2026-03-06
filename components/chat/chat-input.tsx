"use client";

import { useRef, useEffect, useState } from "react";
import { useChatContext } from "./chat-provider";

interface ChatInputProps {
  centered?: boolean;
}

export function ChatInput({ centered }: ChatInputProps) {
  const { sendMessage, status } = useChatContext();
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isDisabled = status !== "ready";

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [input]);

  // Focus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  function handleSend() {
    if (!input.trim() || isDisabled) return;
    sendMessage(input);
    setInput("");
  }

  return (
    <div className={centered ? "w-full" : "border-t border-border bg-background px-4 py-3"}>
      <div className={`mx-auto ${centered ? "max-w-xl" : "max-w-2xl"}`}>
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Reply..."
            rows={1}
            className={`w-full resize-none rounded-2xl border border-border bg-card pr-12 pl-4 py-3 text-sm outline-none transition-all placeholder:text-muted focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/20 dark:focus:border-zinc-500 dark:focus:ring-zinc-500/20 ${centered ? "text-base py-3.5" : ""}`}
            disabled={isDisabled}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isDisabled}
            className="absolute right-2 bottom-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white transition-all hover:bg-primary-hover disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Send message"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
        {!centered && (
          <p className="mt-1.5 text-center text-[10px] text-muted/60">
            Press Enter to send, Shift+Enter for new line
          </p>
        )}
      </div>
    </div>
  );
}
