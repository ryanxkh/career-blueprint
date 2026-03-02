"use client";

import { useEffect, useRef } from "react";
import { useChatContext, getMessageText } from "./chat-provider";

export function ChatMessages() {
  const { messages, status } = useChatContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  return (
    <div className="chat-scroll flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-primary text-white"
                  : "bg-card border border-border"
              }`}
            >
              {message.role === "assistant" ? (
                <div
                  className="prose-chat text-sm"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(getMessageText(message)),
                  }}
                />
              ) : (
                <p className="text-sm whitespace-pre-wrap">
                  {getMessageText(message)}
                </p>
              )}
            </div>
          </div>
        ))}

        {(status === "submitted" || status === "streaming") &&
          messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-xl px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-muted" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-muted [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-muted [animation-delay:300ms]" />
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
      // Escape HTML
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Headings
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      // Bold and italic
      .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Inline code
      .replace(/`(.+?)`/g, "<code>$1</code>")
      // Horizontal rules
      .replace(/^---$/gm, "<hr>")
      // Checkboxes (before list processing)
      .replace(
        /^- \[ \] (.+)$/gm,
        '<li style="list-style:none">&#9744; $1</li>'
      )
      .replace(
        /^- \[x\] (.+)$/gim,
        '<li style="list-style:none">&#9745; $1</li>'
      )
      // Unordered lists
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      .replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>")
      // Ordered lists
      .replace(/^\d+\.\s+(.+)$/gm, "<li>$1</li>")
      // Blockquotes
      .replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>")
      // Tables
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
      // Paragraphs
      .replace(/^(?!<[a-z])((?!<\/)[^\n]+)$/gm, "<p>$1</p>")
      // Clean up
      .replace(/\n{3,}/g, "\n\n")
  );
}
