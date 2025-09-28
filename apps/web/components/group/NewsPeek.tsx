"use client";
import clsx from 'clsx';
import { useEffect, useMemo, useRef } from 'react';

export default function NewsPeek({
  name = 'News',
  anchor,
  preview,
  fullText,
  onClose,
}: {
  name?: string;
  anchor: DOMRect;
  preview?: { text: string; isMe: boolean; showName?: boolean };
  fullText: string;
  onClose: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const style = useMemo(() => {
    const margin = 12;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 375;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 812;

    const width = Math.min(vw - margin * 2, 560);
    const belowTop = anchor.bottom + 12;
    const estHeight = 420;
    let top = belowTop;
    if (vh - belowTop < 260) top = Math.max(margin, anchor.top - estHeight - 12);
    const maxHeight = Math.floor(vh * 0.66);
    let left = vw / 2 - width / 2;
    left = Math.max(margin, Math.min(left, vw - width - margin));

    return { left, top, width, maxHeight, previewLeft: anchor.left, previewTop: anchor.top, previewWidth: anchor.width } as const;
  }, [anchor]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const el = cardRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    function onScroll() { onClose(); }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('touchstart', onDoc, { passive: true });
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('touchstart', onDoc as any);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-label={`Details for ${name}`} className="fixed inset-0 z-50 overscroll-contain select-none" style={{ WebkitUserSelect: 'none', userSelect: 'none' } as any}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {preview && (
        <div aria-hidden className="absolute pointer-events-none" style={{ left: style.previewLeft, top: style.previewTop, width: style.previewWidth }}>
          <div className={clsx('max-w-[80%] rounded-2xl px-3 py-2 border text-sm', preview.isMe ? 'ml-auto bg-pp-purple border-pp-purple text-white' : 'mr-auto bg-pp-card border-pp-border text-pp-text')}>
            {!preview.isMe && preview.showName && (<div className="text-xs text-pp-subt mb-1">{name}</div>)}
            <div className="whitespace-pre-wrap break-words">{preview.text}</div>
          </div>
        </div>
      )}

      <div ref={cardRef} className={clsx('absolute rounded-xl border border-pp-border bg-pp-card/95 text-pp-text shadow-xl p-4', 'backdrop-blur-sm overflow-y-auto select-none')} style={{ left: style.left, top: style.top, width: style.width, maxHeight: style.maxHeight }}>
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold">{name}</div>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded hover:bg-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
              <path d="M6 6L18 18M6 18L18 6" />
            </svg>
          </button>
        </div>
        <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
          {fullText}
        </div>
      </div>
    </div>
  );
}
