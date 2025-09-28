"use client";
import { useState } from 'react';
import { useGroupStore } from '../../lib/groupStore';

export default function GroupInput() {
  const send = useGroupStore((s) => s.send);
  const [value, setValue] = useState('');

  const submit = async () => {
    const t = value.trim();
    if (!t) return;
    setValue('');
    await send(t);
  };

  return (
    <div className="w-full border border-pp-border bg-pp-card rounded-xl p-2 flex items-end gap-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder="Type a message..."
        className="flex-1 bg-transparent outline-none resize-none min-h-12 max-h-48 text-[16px] md:text-sm placeholder:text-pp-subt p-2"
      />
      <button
        onClick={submit}
        aria-label="Send message"
        className="w-10 h-10 rounded-full bg-pp-purple text-white flex items-center justify-center hover:opacity-90 shadow-sm self-end"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 -rotate-45"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </button>
    </div>
  );
}
