import { NextRequest, NextResponse } from 'next/server';
import { broadcast, getHub, GroupMessage } from '../../../lib/server/groupHub';

export const dynamic = 'force-dynamic';

// This endpoint proxies chat requests to a remote MCP-enabled agent backend (e.g., remote browser control)
// Configure via env:
// - AGENT_SYSTEM_PROMPT: the system prompt to use for the agent
// - MCP_BROWSER_URL: the remote MCP server URL
// - MCP_API_KEY: optional bearer token for that MCP server
export async function POST(req: NextRequest) {
  const hub = getHub();
  const body = await req.json().catch(() => null);
  if (!body || typeof body.text !== 'string') {
    return NextResponse.json({ ok: false, error: 'Missing text' }, { status: 400 });
  }

  const input = body.text.trim();
  if (!input) {
    return NextResponse.json({ ok: false, error: 'Empty message' }, { status: 400 });
  }

  const systemPrompt = process.env.AGENT_SYSTEM_PROMPT || 'You are Agent, an assistant that can use remote browser tools via MCP.';
  const mcpUrl = process.env.MCP_BROWSER_URL;
  const mcpKey = process.env.MCP_API_KEY;

  let agentText = '';
  try {
    if (!mcpUrl) {
      // No backend configured yet; simulate response so UX works locally
      agentText = `Agent (simulated): ${input}`;
    } else {
      // Payload is generic; adapt to your MCP server contract as needed
      const payload = {
        prompt: input,
        system: systemPrompt,
        mode: 'chat',
        mcp: {
          endpoint: mcpUrl,
        },
      };

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (mcpKey) headers['Authorization'] = `Bearer ${mcpKey}`;

      const res = await fetch(mcpUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      try {
        const json = JSON.parse(text);
        // Try common shapes
        agentText = json.output || json.message || json.text || JSON.stringify(json);
      } catch {
        agentText = text || 'Agent responded with no content.';
      }
    }
  } catch (err) {
    agentText = 'Agent request failed.';
  }

  const botMsg: GroupMessage = {
    id: crypto.randomUUID(),
    userId: 'bot_agent',
    name: 'Agent',
    text: agentText,
    ts: Date.now(),
  };
  hub.messages.push(botMsg);
  if (hub.messages.length > 500) hub.messages.shift();
  broadcast('message', botMsg);

  return NextResponse.json({ ok: true });
}
