import { NextRequest, NextResponse } from 'next/server';
import stripe from '../../common/stripe';
import type { PricesRequest, PricesResponse } from '../../common/types';

export async function POST(req: NextRequest) {
  const body: PricesRequest = await req.json();
  const { productId } = body;
  if (!productId) {
    return NextResponse.json({ prices: [] }, { status: 400 });
  }
  try {
    const prices = await stripe.prices.list({ product: productId, active: true });
    return NextResponse.json<PricesResponse>({ prices: prices.data });
  } catch (error) {
    return NextResponse.json({ prices: [], error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const prices = await stripe.prices.list({ active: true });
  return NextResponse.json({ prices: prices.data });
}