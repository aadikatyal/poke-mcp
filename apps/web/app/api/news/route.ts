import { NextRequest, NextResponse } from 'next/server';
import { broadcast, getHub, GroupMessage } from '../../../lib/server/groupHub';

export const dynamic = 'force-dynamic';

// News agent: proxies a query to Perplexity and broadcasts the response as a bot message
// Env vars:
// - PERPLEXITY_API_KEY: required for real calls; if missing, we simulate
// - PERPLEXITY_SEARCH_URL: optional override; if not set, we use chat/completions fallback
export async function POST(req: NextRequest) {
  const hub = getHub();
  const body = await req.json().catch(() => null);
  if (!body || typeof body.text !== 'string') {
    return NextResponse.json({ ok: false, error: 'Missing text' }, { status: 400 });
  }

  const query = body.text.trim();
  if (!query) {
    return NextResponse.json({ ok: false, error: 'Empty message' }, { status: 400 });
  }

  const apiKey = process.env.PERPLEXITY_API_KEY;
  const searchUrl = process.env.PERPLEXITY_SEARCH_URL || '';

  let botText = '';
  try {
    if (!apiKey) {
      // No key configured — simulate response so UX works locally
      botText = `News (simulated): "${query}"`;
    } else {
      // Prefer the new Search API if caller provided a URL; otherwise use chat/completions which supports web answers
      let res: Response;
      if (searchUrl) {
        // Attempt the Search API. We keep payload generic to allow flexibility across versions.
        res = await fetch(searchUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            // optional knobs if supported by the configured endpoint
            top_k: 5,
            return_sources: true,
          }),
        });
      } else {
        // Fallback: Perplexity Chat Completions with citations (works today)
        res = await fetch('https://api.perplexity.ai/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'sonar-pro',
            messages: [
              { role: 'system', content: 'You are News, a concise news & sports update assistant. Cite sources when available.' },
              { role: 'user', content: query },
            ],
            return_citations: true,
          }),
        });
      }

      const text = await res.text();

      // Try to parse JSON response into a nice bot string
      try {
        const json = JSON.parse(text);
        // Try multiple likely shapes
        // Search API candidates
        const answer = json.answer || json.result || json.text || json.output || null;
        const citations = json.citations || json.sources || null;

        if (answer) {
          // If we have citations as array of URLs/objects, append a short list
          if (Array.isArray(citations) && citations.length > 0) {
            const firstFew = citations
              .slice(0, 3)
              .map((c: any) => (typeof c === 'string' ? c : c?.url || c?.source || ''))
              .filter(Boolean);
            if (firstFew.length > 0) {
              botText = `${answer}\n\nSources:\n- ${firstFew.join('\n- ')}`;
            } else {
              botText = String(answer);
            }
          } else {
            botText = String(answer);
          }
        } else if (json.choices && Array.isArray(json.choices) && json.choices[0]?.message?.content) {
          // Chat Completions shape
          botText = String(json.choices[0].message.content);

          // If citations are present on the choice, include a short list
          const cites = json.choices[0].message?.citations || json.choices[0]?.citations;
          if (Array.isArray(cites) && cites.length > 0) {
            const firstFew = cites
              .slice(0, 3)
              .map((c: any) => (typeof c === 'string' ? c : c?.url || c?.source || ''))
              .filter(Boolean);
            if (firstFew.length > 0) {
              botText += `\n\nSources:\n- ${firstFew.join('\n- ')}`;
            }
          }
        } else {
          // Unknown JSON shape; show as stringified
          botText = JSON.stringify(json);
        }
      } catch {
        // Not JSON; treat as plain text
        botText = text || 'Perplexity responded with no content.';
      }
    }
  } catch (err: any) {
    botText = 'News request failed.';
  }

  const botMsg: GroupMessage = {
    id: crypto.randomUUID(),
    userId: 'bot_news',
    name: 'News',
    text: botText,
    ts: Date.now(),
  };
  hub.messages.push(botMsg);
  if (hub.messages.length > 500) hub.messages.shift();
  broadcast('message', botMsg);

  return NextResponse.json({ ok: true });
}
