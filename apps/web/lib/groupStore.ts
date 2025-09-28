import { create } from 'zustand';

export type GroupUser = { id: string; name: string };
export type GroupMessage = { id: string; userId: string; name: string; text: string; ts: number };

type State = {
  users: GroupUser[];
  currentUser: GroupUser;
  messages: GroupMessage[];
  connected: boolean;
  connect: () => void;
  send: (text: string) => Promise<void>;
  setCurrentUser: (id: string) => void;
};

export const useGroupStore = create<State>((set, get) => ({
  users: [
    { id: 'pranav', name: 'Pranav' },
    { id: 'satvik', name: 'Satvik' },
    { id: 'aadi', name: 'Aadi' },
    { id: 'harish', name: 'Harish' },
    { id: 'mukesh', name: 'Mukesh' },
  ],
  currentUser: { id: 'pranav', name: 'Pranav' },
  messages: [],
  connected: false,
  connect: () => {
    if (get().connected) return;
    const es = new EventSource('/api/group/stream');

    es.addEventListener('init', (e) => {
      try {
        const data = JSON.parse((e as MessageEvent).data);
        set({ messages: data.messages || [], connected: true });
      } catch {}
    });

    es.addEventListener('message', (e) => {
      try {
        const m = JSON.parse((e as MessageEvent).data);
        set((s) => ({ messages: [...s.messages, m] }));
      } catch {}
    });

    es.onerror = () => {
      es.close();
      set({ connected: false });
      setTimeout(() => get().connect(), 2000);
    };
  },
  send: async (text: string) => {
    const { currentUser } = get();
    const trimmed = text.trim();

    // Always post the user's message to the room
    await fetch('/api/group/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, name: currentUser.name, text }),
    });

    // Slash command: /poke ... routes to the Poke bot endpoint
    if (trimmed.toLowerCase().startsWith('/poke')) {
      // Extract the content after '/poke'
      const payload = trimmed.replace(/^\/poke\s*/i, '');
      // Fire-and-forget to server; server will broadcast Poke's response
      try {
        await fetch('/api/poke', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser.id, name: currentUser.name, text: payload }),
        });
      } catch (e) {
        // If bot call fails, broadcast a local error message for visibility
        await fetch('/api/group/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'bot_poke', name: 'Poke', text: 'Poke command failed. Please try again later.', }),
        });
      }
    }

    // Slash command: /agent ... routes to the Cedar-style agent backend with MCP tools
    if (trimmed.toLowerCase().startsWith('/agent')) {
      const payload = trimmed.replace(/^\/agent\s*/i, '');
      try {
        await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser.id, name: currentUser.name, text: payload }),
        });
      } catch (e) {
        await fetch('/api/group/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'bot_agent', name: 'Agent', text: 'Agent command failed. Please try again later.' }),
        });
      }
    }
  },
  setCurrentUser: (id: string) => {
    const user = get().users.find((u) => u.id === id);
    if (user) {
      set({ currentUser: user });
      if (typeof window !== 'undefined') {
        try { localStorage.setItem('pp_user_id', id); } catch {}
      }
    }
  },
}));
