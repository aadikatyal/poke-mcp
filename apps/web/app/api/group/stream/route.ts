import { NextRequest } from 'next/server';
import { getHub, sseEvent } from '../../../../lib/server/groupHub';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest) {
  const hub = getHub();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const client = { id: crypto.randomUUID(), controller };
      hub.clients.add(client);

      // send history
      try {
        controller.enqueue(encoder.encode(sseEvent('init', { messages: hub.messages })));
      } catch {}

      // heartbeat
      const interval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode('event: ping\n' + 'data: {}\n\n'));
        } catch {
          clearInterval(interval);
          hub.clients.delete(client);
          try { controller.close(); } catch {}
        }
      }, 25000);
    },
    cancel() {
      // client removed on next broadcast attempt
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
