"use client";
import { useState } from 'react';
import { useGroupStore } from '../../lib/groupStore';

export default function GroupInput() {
  const send = useGroupStore((s) => s.send);
  const [value, setValue] = useState('');
  const [pokeMode, setPokeMode] = useState(false);

  const submit = async () => {
    const t = value.trim();
    if (!t) return;
    setValue('');
    // If poke mode is active and user didn't explicitly type /poke, prefix it
    const outgoing = pokeMode && !/^\s*\/poke\b/i.test(t) ? `/poke ${t}` : t;
    await send(outgoing);
  };

  return (
    <div className={"w-full border border-pp-border bg-pp-card rounded-xl p-2 flex items-end gap-2 " + (pokeMode ? 'poke-glow' : '')}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder={pokeMode ? "Poke: type your request… (e.g. place a 2-leg parlay)" : "Type a message..."}
        className="flex-1 bg-transparent outline-none resize-none min-h-12 max-h-48 text-[16px] md:text-sm placeholder:text-pp-subt p-2"
      />
      {/* Next.js-style toggle button for Poke mode */}
      <button
        type="button"
        onClick={() => setPokeMode((v) => !v)}
        aria-pressed={pokeMode}
        aria-label="Toggle Poke mode"
        title={pokeMode ? 'Poke mode on: messages will be sent to /poke' : 'Enable Poke mode'}
        className={
          "w-10 h-10 rounded-full flex items-center justify-center self-end transition-all duration-300 shadow-sm border " +
          (pokeMode
            ? 'bg-pp-purple/90 text-white border-pp-purple hover:bg-pp-purple'
            : 'bg-transparent text-pp-text border-pp-border hover:bg-white/5')
        }
      >
        {/* Minimal Next.js-like logo mark (stylized N with slash) */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-95">
          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
          <path d="M7 16V8l10 10V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
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
