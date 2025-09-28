import { NextRequest, NextResponse } from 'next/server';
import { broadcast, getHub, GroupMessage } from '../../../lib/server/groupHub';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const hub = getHub();
  const body = await req.json().catch(() => null);
  if (!body || typeof body.text !== 'string') {
    return NextResponse.json({ ok: false, error: 'Missing text' }, { status: 400 });
  }

  const message = body.text.trim();
  if (!message) {
    return NextResponse.json({ ok: false, error: 'Empty message' }, { status: 400 });
  }

  const apiKey = process.env.POKE_API_KEY;
  let botText = '';
  try {
    if (!apiKey) {
      // No key yet — simulate so UX still works locally
      botText = `Poke (simulated): "${message}"`;
    } else {
      const res = await fetch('https://poke.com/api/v1/inbound-sms/webhook', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const text = await res.text();
      // Try to parse JSON; if it fails, show raw text
      try {
        const json = JSON.parse(text);
        if (typeof json === 'string') {
          botText = json;
        } else if (json && typeof json === 'object') {
          const success = (json as any).success ?? (json as any).sucess ?? (json as any).ok;
          if (success === true) {
            botText = 'Of course! Placing bet now';
          } else if (typeof (json as any).message === 'string') {
            botText = (json as any).message;
          } else if (typeof (json as any).text === 'string') {
            botText = (json as any).text;
          } else {
            botText = JSON.stringify(json);
          }
        } else {
          botText = String(json);
        }
      } catch {
        // Not JSON; treat as plain text
        if (typeof text === 'string' && text.trim().toLowerCase() === 'ok') {
          botText = 'Of course! Placing bet now';
        } else {
          botText = text || 'Poke responded with no content.';
        }
      }
    }
  } catch (err: any) {
    botText = 'Poke request failed.';
  }

  const botMsg: GroupMessage = {
    id: crypto.randomUUID(),
    userId: 'bot_poke',
    name: 'Poke',
    text: botText,
    ts: Date.now(),
  };
  hub.messages.push(botMsg);
  if (hub.messages.length > 500) hub.messages.shift();
  broadcast('message', botMsg);

  return NextResponse.json({ ok: true });
}
