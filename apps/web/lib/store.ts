import { create } from 'zustand';

export type User = { id: string; name: string; avatar?: string };
export type Message = {
  id: string;
  authorId: string;
  authorType: 'user' | 'bot';
  content: string;
  createdAt: number;
};

type State = {
  users: User[];
  currentUserId: string;
  messages: Message[];
  send: (text: string) => void;
  addMessage: (m: Message) => void;
};

const useChatStore = create<State>((set, get) => ({
  users: [
    { id: 'u1', name: 'Vik' },
    { id: 'u2', name: 'Aadi' },
    { id: 'u3', name: 'Kat' },
  ],
  currentUserId: 'u1',
  messages: [
    { id: 'm1', authorId: 'u2', authorType: 'user', content: 'Welcome to the room 👋', createdAt: Date.now() - 60000 },
  ],
  send: (text) => {
    const { currentUserId, messages } = get();
    const msg: Message = {
      id: `m${messages.length + 1}`,
      authorId: currentUserId,
      authorType: 'user',
      content: text,
      createdAt: Date.now(),
    };
    set({ messages: [...messages, msg] });
  },
  addMessage: (m) => set({ messages: [...get().messages, m] }),
}));

export default useChatStore;
