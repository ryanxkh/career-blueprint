"use client";

import { useEffect, useRef, useMemo } from "react";
import { useChatContext, getMessageText } from "./chat-provider";

export function ChatMessages() {
  const { messages, status } = useChatContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // Filter to only conversation messages (skip welcome)
  const conversationMessages = messages.filter((m) => m.id !== "welcome");
  const isWaiting = status === "submitted" || status === "streaming";

  return (
    <div className="chat-scroll flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto max-w-2xl space-y-5">
        {conversationMessages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            text={getMessageText(message)}
          />
        ))}

        {/* Loading indicator — only show when submitted (before first token) */}
        {status === "submitted" && (
          <div className="flex gap-3">
            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
              C
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted">
                Career Coach
              </p>
              <div className="flex items-center gap-1.5 py-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary/40 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

function MessageBubble({ role, text }: { role: string; text: string }) {
  const isUser = role === "user";

  const html = useMemo(() => {
    if (isUser) return "";
    return renderMarkdown(text);
  }, [text, isUser]);

  return (
    <div className="flex gap-3">
      <div
        className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
          isUser
            ? "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
            : "bg-primary/10 text-primary"
        }`}
      >
        {isUser ? "Y" : "C"}
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-xs font-medium text-muted">
          {isUser ? "You" : "Career Coach"}
        </p>
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
        ) : (
          <div
            className="prose-chat text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </div>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderMarkdown(text: string): string {
  return (
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Break bold labels onto their own line when mid-paragraph
      // Matches " **Label:** " pattern that isn't at the start of a line
      .replace(/(?<!\n)(\s)\*\*([^*]+?:)\*\*/g, "\n**$2**")
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
          return `<tr>${cells.map((c) => `<td>${escapeHtml(c)}</td>`).join("")}</tr>`;
        }
      )
      .replace(/((?:<tr>.*<\/tr>\n?)+)/g, "<table>$1</table>")
      .replace(/^(?!<[a-z])((?!<\/)[^\n]+)$/gm, "<p>$1</p>")
      .replace(/\n{3,}/g, "\n\n")
  );
}
