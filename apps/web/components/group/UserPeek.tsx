"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

export type UserStats = {
  ok: boolean;
  userId: string;
  openLineups: number;
  totalMoneyWon: number;
  topWinningPlayers: { name: string; winnings: number }[];
  favoriteTeam: string;
};

export function formatMoney(n: number) {
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function useUserStats(userId: string | null) {
  const [data, setData] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);
    fetch(`/api/users/${encodeURIComponent(userId)}/stats`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((j) => {
        if (!cancelled) setData(j as UserStats);
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { data, loading, error };
}

export default function UserPeek({
  userId,
  name,
  anchor,
  preview,
  onClose,
}: {
  userId: string;
  name: string;
  anchor: DOMRect;
  preview?: { text: string; isMe: boolean; showName?: boolean };
  onClose: () => void;
}) {
  const { data, loading, error } = useUserStats(userId);
  const cardRef = useRef<HTMLDivElement>(null);

  // Position the card near the anchor, staying within viewport
  const style = useMemo(() => {
    const margin = 12;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 375;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 812;

    // Wide card, capped by viewport
    const width = Math.min(vw - margin * 2, 560);

    // Prefer placing BELOW the message; if not enough space, place above
    const belowTop = anchor.bottom + 12;
    const estHeight = 320;
    let top = belowTop;
    if (vh - belowTop < 220) {
      // not enough space below, use above
      top = Math.max(margin, anchor.top - estHeight - 12);
    }
    // Ensure within viewport
    const maxHeight = Math.floor(vh * 0.66);

    // Center card horizontally
    let left = vw / 2 - width / 2;
    left = Math.max(margin, Math.min(left, vw - width - margin));

    // Also expose preview position (same as anchor)
    const previewLeft = anchor.left;
    const previewTop = anchor.top;
    const previewWidth = anchor.width;

    return { left, top, width, maxHeight, previewLeft, previewTop, previewWidth } as const;
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
    function onScroll() {
      onClose();
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('touchstart', onDoc, { passive: true });
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('touchstart', onDoc);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-label={`Stats for ${name}`}
className="fixed inset-0 z-50 overscroll-contain select-none"
      style={{ WebkitUserSelect: 'none', userSelect: 'none' } as any}
    >
      {/* dim background with blur */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* Message preview so the original message remains visible above the blur */}
      {preview && (
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            left: style.previewLeft,
            top: style.previewTop,
            width: style.previewWidth,
          }}
        >
          <div
            className={clsx(
              'max-w-[80%] rounded-2xl px-3 py-2 border text-sm',
              preview.isMe
                ? 'ml-auto bg-pp-purple border-pp-purple text-white'
                : 'mr-auto bg-pp-card border-pp-border text-pp-text'
            )}
          >
            {!preview.isMe && preview.showName && (
              <div className="text-xs text-pp-subt mb-1">{name}</div>
            )}
            <div className="whitespace-pre-wrap break-words">{preview.text}</div>
          </div>
        </div>
      )}

      <div
        ref={cardRef}
        className={clsx(
          'absolute rounded-xl border border-pp-border bg-pp-card/95 text-pp-text shadow-xl p-4',
          'backdrop-blur-sm overflow-y-auto select-none'
        )}
        style={{ left: style.left, top: style.top, width: style.width, maxHeight: style.maxHeight }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold">{name}</div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded hover:bg-white/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
              <path d="M6 6L18 18M6 18L18 6" />
            </svg>
          </button>
        </div>

        {loading && (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-white/10 rounded" />
            <div className="h-4 bg-white/10 rounded" />
            <div className="h-4 bg-white/10 rounded" />
          </div>
        )}
        {error && <div className="text-red-400 text-sm">Failed to load: {error}</div>}
        {data && (
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="col-span-2">
              <div className="text-pp-subt text-xs">Open lineups</div>
              <div className="text-base font-medium">{data.openLineups}</div>
            </div>
            <div className="col-span-2">
              <div className="text-pp-subt text-xs">Total money won</div>
              <div className="text-base font-medium">{formatMoney(data.totalMoneyWon)}</div>
            </div>
            <div className="col-span-2">
              <div className="text-pp-subt text-xs">Top winning players</div>
              <ul className="mt-1 space-y-1">
                {data.topWinningPlayers.map((p) => (
                  <li key={p.name} className="flex justify-between">
                    <span>{p.name}</span>
                    <span className="text-pp-subt">{formatMoney(p.winnings)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2">
              <div className="text-pp-subt text-xs">Favorite team</div>
              <div className="text-base font-medium">{data.favoriteTeam}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

