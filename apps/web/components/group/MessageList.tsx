import clsx from 'clsx';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useGroupStore } from '../../lib/groupStore';
import UserPeek from './UserPeek';

function avatarColor(name: string) {
  const palette = ['#8B5CF6', '#00D4AA', '#F59E0B', '#60A5FA', '#F97316', '#10B981', '#F472B6'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return palette[Math.abs(hash) % palette.length];
}

export default function MessageList({ className }: { className?: string }) {
  const messages = useGroupStore((s) => s.messages);
  const me = useGroupStore((s) => s.currentUser);
  const users = useGroupStore((s) => s.users);
  const ref = useRef<HTMLDivElement>(null);

  // Long-press state for user peek
  const [peek, setPeek] = useState<
    | null
    | {
        userId: string;
        name: string;
        anchor: DOMRect;
        preview: { text: string; isMe: boolean; showName?: boolean };
      }
  >(null);
  const timerRef = useRef<number | null>(null);

  const cancelTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startPressTimer = useCallback(
    (
      target: HTMLElement,
      payload: { userId: string; name: string; text: string; isMe: boolean }
    ) => {
      cancelTimer();
      const rect = target.getBoundingClientRect();
      timerRef.current = window.setTimeout(() => {
        setPeek({
          userId: payload.userId,
          name: payload.name,
          anchor: rect,
          preview: { text: payload.text, isMe: payload.isMe, showName: !payload.isMe },
        });
      }, 450); // ~iOS long-press threshold
    },
    [cancelTimer]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  return (
    <div ref={ref} className={clsx('w-full flex-1 overflow-y-auto flex flex-col gap-3', className)}>
      {messages.map((m) => {
        const isMe = m.userId === me.id;
        const user = users.find((u) => u.id === m.userId) || { id: m.userId, name: m.name };
        const initial = (user.name || '?').slice(0, 1).toUpperCase();
        const bg = avatarColor(user.name || '');
        return (
          <div key={m.id} className={clsx('flex items-end gap-2', isMe ? 'justify-end' : 'justify-start')}>
            {/* Left-side avatar for others */}
            {!isMe && (
              <div
                className="w-7 h-7 rounded-full border border-pp-border flex items-center justify-center text-[10px] font-extrabold text-white select-none"
                style={{ backgroundColor: bg }}
                aria-hidden
                title={user.name}
              >
                {initial}
              </div>
            )}
            <div
              className={clsx(
                'max-w-[80%] rounded-2xl px-3 py-2 border text-sm',
                isMe ? 'bg-pp-purple border-pp-purple text-white' : 'bg-pp-card border-pp-border text-pp-text'
              )}
              onPointerDown={(e) => {
                const el = e.currentTarget as HTMLElement;
                startPressTimer(el, { userId: user.id, name: user.name, text: m.text, isMe });
              }}
              onPointerUp={cancelTimer}
              onPointerLeave={cancelTimer}
              onContextMenu={(e) => {
                // Long-press alternative: right-click opens peek as well
                e.preventDefault();
                const el = e.currentTarget as HTMLElement;
                setPeek({
                  userId: user.id,
                  name: user.name,
                  anchor: el.getBoundingClientRect(),
                  preview: { text: m.text, isMe, showName: !isMe },
                });
              }}
              style={{ WebkitTouchCallout: 'none', userSelect: 'none' } as any}
            >
              {!isMe && (
                <div className="text-xs text-pp-subt mb-1">{m.name}</div>
              )}
              <div className="whitespace-pre-wrap break-words">{m.text}</div>
            </div>
            {/* Right-side avatar for me */}
            {isMe && (
              <div
                className="w-7 h-7 rounded-full border border-pp-border flex items-center justify-center text-[10px] font-extrabold text-white select-none"
                style={{ backgroundColor: avatarColor(me.name) }}
                aria-hidden
                title={me.name}
              >
                {me.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>
        );
      })}

      {peek && (
        <UserPeek
          userId={peek.userId}
          name={peek.name}
          anchor={peek.anchor}
          preview={peek.preview}
          onClose={() => setPeek(null)}
        />
      )}
    </div>
  );
}
