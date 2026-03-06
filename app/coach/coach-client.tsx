"use client";

import {
  ChatProvider,
  useChatContext,
  getMessageText,
  ChatMessages,
  ChatInput,
  ChatPhaseTracker,
} from "@/components/chat";

interface CoachClientProps {
  systemPrompt: string;
}

export function CoachClient({ systemPrompt }: CoachClientProps) {
  return (
    <ChatProvider systemPrompt={systemPrompt}>
      <CoachLayout />
    </ChatProvider>
  );
}

function CoachLayout() {
  const { messages, sendMessage } = useChatContext();

  // Check if user has sent any messages yet
  const hasConversation = messages.some((m) => m.role === "user");

  if (!hasConversation) {
    return <WelcomeView sendMessage={sendMessage} messages={messages} />;
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <div className="flex flex-1 flex-col">
        <ChatMessages />
        <ChatInput />
      </div>
      <aside className="hidden w-72 shrink-0 border-l border-border bg-card p-6 lg:block">
        <ChatPhaseTracker />
      </aside>
    </div>
  );
}

// ── Welcome State (centered, like ChatGPT/Claude) ──

function WelcomeView({
  sendMessage,
  messages,
}: {
  sendMessage: (text: string) => void;
  messages: ReturnType<typeof useChatContext>["messages"];
}) {
  // Get welcome message text
  const welcomeMsg = messages.find((m) => m.id === "welcome");
  const welcomeText = welcomeMsg ? getMessageText(welcomeMsg) : "";
  const paragraphs = welcomeText.split("\n\n").filter(Boolean);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4">
      <div className="w-full max-w-xl">
        {/* Coach avatar + greeting */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold">Career Coach</h1>
        </div>

        {/* Welcome message as clean text */}
        <div className="mb-8 space-y-3 text-center">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className={`leading-relaxed ${i === 0 ? "text-base" : "text-sm text-muted"}`}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Quick-reply chips */}
        <div className="mb-5 flex flex-wrap justify-center gap-2">
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply.label}
              onClick={() => sendMessage(reply.text)}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-all hover:border-primary/40 hover:bg-primary/5"
            >
              {reply.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <ChatInput centered />
      </div>
    </div>
  );
}

const QUICK_REPLIES = [
  {
    label: "I'm ready, let's go",
    text: "I'm ready to get started. Let's do this.",
  },
  {
    label: "I have my resume",
    text: "I'm ready to start. I have my resume to share with you.",
  },
  {
    label: "Starting fresh — no materials",
    text: "I don't have a resume or materials handy, but I'm ready to talk through my career.",
  },
];
