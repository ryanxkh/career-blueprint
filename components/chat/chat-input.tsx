"use client";

import { useRef, useEffect, useState } from "react";
import { useChatContext } from "./chat-provider";

export function ChatInput() {
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
    <div className="border-t border-border bg-background px-4 py-3">
      <div className="mx-auto flex max-w-2xl items-end gap-3">
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
          placeholder="Share your career story or answer the coach's questions..."
          rows={1}
          className="flex-1 resize-none rounded-lg border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted focus:border-primary"
          disabled={isDisabled}
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!input.trim() || isDisabled}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
