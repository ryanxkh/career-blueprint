"use client";

import {
  ChatProvider,
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
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Chat area */}
        <div className="flex flex-1 flex-col">
          <ChatMessages />
          <ChatInput />
        </div>

        {/* Phase tracker sidebar */}
        <aside className="hidden w-72 shrink-0 border-l border-border bg-card p-6 lg:block">
          <ChatPhaseTracker />
        </aside>
      </div>
    </ChatProvider>
  );
}
