import clsx from 'clsx';
import useChatStore, { Message } from '../../lib/store';

export default function ChatBubbles({ messages, className }: { messages: Message[]; className?: string }) {
  const users = useChatStore(s => s.users);
  const currentUserId = useChatStore(s => s.currentUserId);

  return (
    <div className={clsx("w-full flex flex-col gap-3 overflow-y-auto", className)}>
      {messages.map((m) => {
        const isMe = m.authorType === 'user' && m.authorId === currentUserId;
        const author = users.find(u => u.id === m.authorId);
        return (
          <div key={m.id} className={clsx("flex", isMe ? 'justify-end' : 'justify-start')}>
            <div className={clsx(
              'max-w-[80%] rounded-2xl px-3 py-2 border',
              isMe ? 'bg-pp-purple border-pp-purple text-white' : 'bg-pp-card border-pp-border text-pp-text'
            )}>
              {!isMe && (
                <div className="text-xs text-pp-subt mb-1">{author?.name ?? (m.authorType === 'bot' ? 'Bot' : 'User')}</div>
              )}
              <div className="whitespace-pre-wrap break-words text-sm">{m.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  );
}
