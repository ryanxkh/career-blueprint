"use client";

import { useEffect, useRef } from "react";
import { useChatContext, getMessageText } from "./chat-provider";

export function ChatMessages() {
  const { messages, status } = useChatContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // Filter to only conversation messages (skip welcome)
  const conversationMessages = messages.filter((m) => m.id !== "welcome");

  return (
    <div className="chat-scroll flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto max-w-2xl space-y-5">
        {conversationMessages.map((message) => (
          <div key={message.id} className="flex gap-3">
            {/* Avatar */}
            <div
              className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                message.role === "user"
                  ? "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {message.role === "user" ? "Y" : "C"}
            </div>

            {/* Message content */}
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-xs font-medium text-muted">
                {message.role === "user" ? "You" : "Career Coach"}
              </p>
              {message.role === "assistant" ? (
                <div
                  className="prose-chat text-sm"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(getMessageText(message)),
                  }}
                />
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {getMessageText(message)}
                </p>
              )}
            </div>
          </div>
        ))}

        {(status === "submitted" || status === "streaming") &&
          messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3">
              <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                C
              </div>
              <div>
                <p className="mb-1 text-xs font-medium text-muted">
                  Career Coach
                </p>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

// Simple markdown-to-HTML for chat messages
function renderMarkdown(text: string): string {
  return (
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(/^---$/gm, "<hr>")
      .replace(
        /^- \[ \] (.+)$/gm,
        '<li style="list-style:none">&#9744; $1</li>'
      )
      .replace(
        /^- \[x\] (.+)$/gim,
        '<li style="list-style:none">&#9745; $1</li>'
      )
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>")
      .replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>")
      .replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>")
      .replace(
        /^\|(.+)\|$/gm,
        (match) => {
          const cells = match
            .split("|")
            .filter(Boolean)
            .map((c) => c.trim());
          if (cells.every((c) => /^-+$/.test(c))) return "";
          return `<tr>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`;
        }
      )
      .replace(/((?:<tr>.*<\/tr>\n?)+)/g, "<table>$1</table>")
      .replace(/^(?!<[a-z])((?!<\/)[^\n]+)$/gm, "<p>$1</p>")
      .replace(/\n{3,}/g, "\n\n")
  );
}
