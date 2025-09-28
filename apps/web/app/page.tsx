"use client";

import { useEffect } from 'react';
import MessageList from '../components/group/MessageList';
import GroupInput from '../components/group/Input';
import UserSelector from '../components/group/UserSelector';
import { useGroupStore } from '../lib/groupStore';

export default function Page() {
  const connect = useGroupStore((s) => s.connect);
  const users = useGroupStore((s) => s.users);

  useEffect(() => {
    connect();
  }, [connect]);
  return (
    <main className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b border-pp-border bg-pp-bg/90 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-pp-purple/20 flex items-center justify-center">🏀</div>
            <h1 className="text-lg font-semibold">Group Chat (beta)</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-pp-subt text-sm">{users.length} members</div>
            <UserSelector />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl flex-1 w-full px-4 py-4 flex flex-col gap-3">
        <MessageList className="flex-1" />
        <GroupInput />
      </div>
    </main>
  );
}
