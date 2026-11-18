import { NextResponse } from 'next/server';

// Server-side in-memory store for fallback/demo
let serverBookings: any[] = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: serverBookings,
    count: serverBookings.length
  });
}

export async function POST(request: Request) {
  try {
    const booking = await request.json();
    serverBookings.unshift(booking);
    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid booking data' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, scheduledDate, timeWindow } = await request.json();
    serverBookings = serverBookings.map((b) => {
      if (b.id === id) {
        return {
          ...b,
          ...(status ? { status } : {}),
          ...(scheduledDate ? { scheduledDate } : {}),
          ...(timeWindow ? { timeWindow } : {})
        };
      }
      return b;
    });
    return NextResponse.json({ success: true, updatedId: id });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update booking' }, { status: 400 });
  }
}
