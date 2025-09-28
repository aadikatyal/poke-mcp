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
