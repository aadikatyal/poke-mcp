"use client";

import { ChatBubbles } from '@/cedar/components/chatMessages/ChatBubbles';
import { ChatInput } from '@/cedar/components/chatInput/ChatInput';

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b border-pp-border bg-pp-bg/90 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-pp-purple/20 flex items-center justify-center">🏀</div>
            <h1 className="text-lg font-semibold">Group Chat (beta)</h1>
          </div>
          <div className="text-pp-subt text-sm">3 members</div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl flex-1 w-full px-4 py-4 flex flex-col gap-3">
        <ChatBubbles className="flex-1" />
        <ChatInput />
      </div>
    </main>
  );
}
