import { NextResponse } from 'next/server';
import { SERVICES } from '@/data/services';

let serverBasePrices: Record<string, number> = {
  'house-deep-cleaning': 120,
  'carpet-cleaning': 129,
  'gutter-cleaning': 135,
  'snow-removal': 65,
  'pressure-washing': 140,
  'junk-removal': 89,
  'dryer-vent-cleaning': 119,
  'lawn-garden-cleanup': 130,
  'hvac-maintenance': 115,
  'driveway-walkway-de-icing': 55,
};

export async function GET() {
  const enrichedServices = SERVICES.map((s) => ({
    ...s,
    startingPrice: serverBasePrices[s.id] || s.startingPrice
  }));

  return NextResponse.json({
    success: true,
    services: enrichedServices,
    basePrices: serverBasePrices
  });
}

export async function PUT(request: Request) {
  try {
    const { serviceId, basePrice } = await request.json();
    if (serviceId && typeof basePrice === 'number') {
      serverBasePrices[serviceId] = basePrice;
      return NextResponse.json({ success: true, serviceId, basePrice });
    }
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update service base price' }, { status: 400 });
  }
}
