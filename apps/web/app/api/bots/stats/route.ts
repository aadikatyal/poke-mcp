import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Stats bot route scaffolded. Not implemented.' });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ status: 'ok', echo: body, message: 'Stats bot route scaffolded. Not implemented.' });
}
