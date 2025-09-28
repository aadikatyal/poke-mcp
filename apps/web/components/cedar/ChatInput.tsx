"use client";

import { useState } from 'react';
import useChatStore from '../../lib/store';

export default function ChatInput() {
  const send = useChatStore(s => s.send);
  const [value, setValue] = useState('');

  const submit = () => {
    const text = value.trim();
    if (!text) return;
    send(text);
    setValue('');
  };

  return (
    <div className="w-full border border-pp-border bg-pp-card rounded-xl p-2">
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
        className="w-full bg-transparent outline-none resize-none min-h-12 max-h-48 text-sm placeholder:text-pp-subt p-2"
      />
      <div className="flex justify-end">
        <button onClick={submit} className="px-3 py-1.5 text-sm rounded-md bg-pp-purple text-white hover:opacity-90">
          Send
        </button>
      </div>
    </div>
  );
}
