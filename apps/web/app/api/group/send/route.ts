import { NextRequest, NextResponse } from 'next/server';
import { broadcast, getHub, GroupMessage } from '../../../../lib/server/groupHub';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const hub = getHub();
  const body = await req.json().catch(() => null);
  if (!body || typeof body.text !== 'string' || !body.text.trim()) {
    return NextResponse.json({ ok: false, error: 'Invalid message' }, { status: 400 });
  }
  const userId = typeof body.userId === 'string' ? body.userId : 'u1';
  const name = typeof body.name === 'string' ? body.name : 'User';

  const msg: GroupMessage = {
    id: crypto.randomUUID(),
    userId,
    name,
    text: body.text.trim(),
    ts: Date.now(),
  };
  hub.messages.push(msg);
  if (hub.messages.length > 500) hub.messages.shift();
  broadcast('message', msg);
  return NextResponse.json({ ok: true, message: msg });
}
