import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Injury bot route scaffolded. Not implemented.' });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ status: 'ok', echo: body, message: 'Injury bot route scaffolded. Not implemented.' });
}
