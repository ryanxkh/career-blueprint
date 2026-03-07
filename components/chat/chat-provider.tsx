"use client";

import { createContext, useContext, useRef, useEffect, useState, useCallback, useMemo } from "react";
import type { UIMessage } from "@ai-sdk/react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { containsBlueprint, extractBlueprintMarkdown } from "@/lib/blueprint-detector";
import { parseBlueprint } from "@/lib/blueprint-parser";
import { saveBlueprint as saveToLocalStorage } from "@/lib/storage";
import type { CoachingPhase } from "@/lib/types";

// ── Helpers ──

export function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

// ── Context ──

interface ChatContextValue {
  messages: UIMessage[];
  status: "ready" | "submitted" | "streaming" | "error";
  sendMessage: (text: string) => void;
  currentPhase: CoachingPhase;
  blueprintReady: boolean;
  error: Error | undefined;
  sessionId: string;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}

// ── Welcome message ──

const WELCOME_MESSAGE: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "I'm here to help you build your Career Blueprint — a document that captures where you are, where you want to go, and how to get there. By the end of our conversation, you'll walk away with a clean, structured plan covering your career goals, skills assessment, and concrete next steps with milestones.\n\nThis will take some back-and-forth conversation — probably 20-30 exchanges — as we dig into what you really want from your career.\n\nIf you've got some time set aside and you're ready to dive in, just say the word and we'll get started.",
    },
  ],
};

// ── Provider ──

interface ChatProviderProps {
  systemPrompt: string;
  sessionId: string;
  initialMessages?: { role: "user" | "assistant"; content: string }[];
  children: React.ReactNode;
}

export function ChatProvider({
  systemPrompt,
  sessionId,
  initialMessages,
  children,
}: ChatProviderProps) {
  const [blueprintReady, setBlueprintReady] = useState(false);

  // Convert DB messages to UIMessage format
  const hydratedMessages = useMemo(() => {
    const msgs: UIMessage[] = [WELCOME_MESSAGE];
    if (initialMessages) {
      for (const msg of initialMessages) {
        msgs.push({
          id: crypto.randomUUID(),
          role: msg.role,
          parts: [{ type: "text", text: msg.content }],
        });
      }
    }
    return msgs;
  }, [initialMessages]);

  const transportRef = useRef(
    new DefaultChatTransport({
      api: "/api/chat",
      body: { system: systemPrompt, sessionId },
    })
  );

  const { messages, sendMessage: rawSendMessage, status, error } = useChat({
    transport: transportRef.current,
    messages: hydratedMessages,
  });

  // Detect current coaching phase from message content
  const currentPhase = detectPhase(messages);

  // Check for Blueprint in the latest assistant message
  useEffect(() => {
    if (status !== "ready" || blueprintReady) return;

    const lastAssistant = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");

    if (!lastAssistant) return;

    const text = getMessageText(lastAssistant);
    if (containsBlueprint(text)) {
      const markdown = extractBlueprintMarkdown(text);
      if (markdown) {
        try {
          const blueprint = parseBlueprint(markdown);
          // Save to server via API
          fetch("/api/blueprints", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: blueprint.name,
              data: blueprint,
              sessionId,
            }),
          }).catch(() => {
            // Fallback: still save to localStorage
          });
          // Also save locally for immediate access
          saveToLocalStorage(blueprint);
          setBlueprintReady(true);
        } catch {
          // Parse failed — don't mark as ready
        }
      }
    }
  }, [messages, status, blueprintReady, sessionId]);

  // Auto-title session from first user message
  const hasAutoTitled = useRef(false);
  useEffect(() => {
    if (hasAutoTitled.current) return;
    const firstUser = messages.find((m) => m.role === "user");
    if (!firstUser) return;

    hasAutoTitled.current = true;
    const text = getMessageText(firstUser).slice(0, 60);
    const title = text.length < getMessageText(firstUser).length ? text + "..." : text;

    fetch(`/api/sessions/${sessionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }).catch(() => {});
  }, [messages, sessionId]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || status !== "ready") return;
      rawSendMessage({ text });
    },
    [status, rawSendMessage]
  );

  return (
    <ChatContext.Provider
      value={{
        messages,
        status,
        sendMessage,
        currentPhase,
        blueprintReady,
        error,
        sessionId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// ── Phase Detection ──

function detectPhase(messages: UIMessage[]): CoachingPhase {
  // Skip the welcome message — only analyze actual conversation
  const assistantTexts = messages
    .filter((m) => m.role === "assistant")
    .slice(1) // skip welcome
    .map((m) => getMessageText(m).toLowerCase());

  if (assistantTexts.length === 0) return 1;

  // Check the most recent assistant messages for phase-specific language
  const recent = assistantTexts.slice(-3).join(" ");
  const allText = assistantTexts.join(" ");

  // Phase 5: Blueprint output delivered
  if (recent.includes("milestone tracker") || recent.includes("# career blueprint")) return 5;
  // Phase 4: Drafting goals
  if (recent.includes("draft") && (recent.includes("goal") || recent.includes("synthesis"))) return 4;
  // Phase 3: Skills assessment (specific coaching language, not intro mentions)
  if (recent.includes("accomplishment analysis") || recent.includes("key accomplishments") || (allText.includes("skill vs") || allText.includes("skill or experience"))) return 3;
  // Phase 2: Discovery begins after a few exchanges
  if (assistantTexts.length >= 2) return 2;

  return 1;
}
