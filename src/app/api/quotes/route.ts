import { NextResponse } from 'next/server';

let serverQuotes: any[] = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: serverQuotes,
    count: serverQuotes.length
  });
}

export async function POST(request: Request) {
  try {
    const quote = await request.json();
    serverQuotes.unshift(quote);
    return NextResponse.json({ success: true, quote }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid quote data' }, { status: 400 });
  }
}
