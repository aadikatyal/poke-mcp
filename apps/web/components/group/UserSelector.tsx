"use client";
import { useEffect } from 'react';
import { useGroupStore } from '../../lib/groupStore';

export default function UserSelector() {
  const users = useGroupStore((s) => s.users);
  const current = useGroupStore((s) => s.currentUser);
  const setCurrentUser = useGroupStore((s) => s.setCurrentUser);

  // Hydrate selected user from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pp_user_id');
      if (saved && users.find((u) => u.id === saved)) {
        setCurrentUser(saved);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs text-pp-subt">User</label>
      <select
        value={current.id}
        onChange={(e) => setCurrentUser(e.target.value)}
        className="bg-pp-card border border-pp-border text-sm rounded-md px-2 py-1 focus:outline-none">
        {users.map((u) => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>
    </div>
  );
}
