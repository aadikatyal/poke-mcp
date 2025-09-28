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
    <main className="h-[100dvh] flex flex-col overflow-hidden">
      {/* DM-style header: back arrow, avatars, group name */}
      <header className="sticky top-0 z-10 border-b border-pp-border bg-pp-bg/90 backdrop-blur">
        <div className="px-0 min-h-14 flex items-center justify-between pt-[env(safe-area-inset-top)]">
          <div className="flex items-center">
            <button
            aria-label="Back"
            onClick={() => {
              try {
                // If embedded in React Native, signal parent to exit chat
                // @ts-ignore
                if (window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === 'function') {
                  // stringify for robustness across platforms
                  window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'exit_chat' }));
                  return;
                }
              } catch {}
              if (history.length > 1) history.back();
            }}
            className="mr-3 p-1 rounded-full hover:bg-white/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex -space-x-2">
              {users.map((u, i) => (
                <div key={u.id} className="w-8 h-8 rounded-full bg-pp-card border border-pp-border flex items-center justify-center text-xs font-bold text-pp-text">
                  {u.name.slice(0,1)}
                </div>
              ))}
            </div>
            <div className="truncate">
              <h1 className="text-base font-semibold leading-none">Friends</h1>
              <div className="text-pp-subt text-xs">{users.length} members</div>
            </div>
          </div>
          </div>
          <div className="pr-3">
            <UserSelector compact />
          </div>
        </div>
      </header>

      <div className="flex-1 w-full px-0 pt-3 pb-3 pb-[env(safe-area-inset-bottom)] flex flex-col gap-3 overflow-hidden">
        <MessageList className="flex-1" />
        <GroupInput />
      </div>
    </main>
  );
}
