# PrizePicks Web (single-room chat)

Minimal web client for a single group chat, aligned with Cedar shadcn-style components.

- Tech: Next.js, TailwindCSS, Zustand
- Components: components/cedar/* (ChatBubbles, ChatInput, MarkdownRenderer)
- Bots: API routes scaffolded at /api/bots/injury and /api/bots/stats (not implemented yet)

Run locally:

```bash
# from repo root
cd apps/web
npm install
npm run dev
```

Then open http://localhost:3000

Notes:
- Chat is single-room, with 3 prefilled users (Vik, Aadi, Kat). Current user is Vik.
- Replace components/cedar/* with official Cedar shadcn-style components when ready, or extend these stubs.
- Implement ambient AI/bots by wiring your logic into the API routes and client store.
