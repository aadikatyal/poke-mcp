import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useGroupStore } from '../../lib/groupStore';

export default function MessageList({ className }: { className?: string }) {
  const messages = useGroupStore((s) => s.messages);
  const me = useGroupStore((s) => s.currentUser);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  return (
    <div ref={ref} className={clsx('w-full flex-1 overflow-y-auto flex flex-col gap-3', className)}>
      {messages.map((m) => {
        const isMe = m.userId === me.id;
        return (
          <div key={m.id} className={clsx('flex', isMe ? 'justify-end' : 'justify-start')}>
            <div className={clsx(
              'max-w-[80%] rounded-2xl px-3 py-2 border text-sm',
              isMe ? 'bg-pp-purple border-pp-purple text-white' : 'bg-pp-card border-pp-border text-pp-text'
            )}>
              {!isMe && (
                <div className="text-xs text-pp-subt mb-1">{m.name}</div>
              )}
              <div className="whitespace-pre-wrap break-words">{m.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
