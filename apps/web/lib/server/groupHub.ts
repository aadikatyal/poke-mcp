export type GroupMessage = {
  id: string;
  userId: string;
  name: string;
  text: string;
  ts: number;
  // Optional extra data for certain bot messages (e.g., /news full response)
  fullText?: string;
  // Optional categorization of message origin/type
  kind?: 'news' | 'poke' | 'agent' | 'user' | string;
};

type Client = {
  id: string;
  controller: ReadableStreamDefaultController<Uint8Array>;
};

type ChatHub = {
  messages: GroupMessage[];
  clients: Set<Client>;
};

export function getHub(): ChatHub {
  const g = globalThis as unknown as { __PP_GROUP_HUB__?: ChatHub };
  if (!g.__PP_GROUP_HUB__) {
    g.__PP_GROUP_HUB__ = {
      messages: [],
      clients: new Set<Client>(),
    };
  }
  return g.__PP_GROUP_HUB__;
}

export function sseEvent(event: string, data: any) {
  return `event: ${event}\n` + `data: ${JSON.stringify(data)}\n\n`;
}

export function broadcast(event: string, data: any) {
  const hub = getHub();
  const encoder = new TextEncoder();
  const chunk = encoder.encode(sseEvent(event, data));
  for (const client of Array.from(hub.clients)) {
    try {
      client.controller.enqueue(chunk);
    } catch {
      hub.clients.delete(client);
    }
  }
}
