import { NextRequest, NextResponse } from 'next/server';
import stripe from '../../common/stripe';
import { getUserIdentifier, fakeDbCreateSubscription } from '../../common/utils';
import type { CreateSubscriptionRequest, CreateSubscriptionResponse } from '../../common/types';

export async function POST(req: NextRequest) {
  const body: CreateSubscriptionRequest = await req.json();
  const { productId, user } = body;
  const identifier = getUserIdentifier(user);
  if (!productId || (!identifier.token && !identifier.username && !identifier.deviceId)) {
    return NextResponse.json<CreateSubscriptionResponse>({ success: false, error: '参数缺失' }, { status: 400 });
  }
  try {
    // 创建Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product: productId,
            unit_amount: 1000, // 示例金额，实际应从Stripe价格获取
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: 'https://yourdomain.com/success',
      cancel_url: 'https://yourdomain.com/cancel',
      metadata: identifier,
    });
    // 伪写入数据库
    await fakeDbCreateSubscription(identifier, productId);
    return NextResponse.json<CreateSubscriptionResponse>({ success: true, sessionUrl: session.url || '' });
  } catch (error) {
    return NextResponse.json<CreateSubscriptionResponse>({ success: false, error: (error as Error).message }, { status: 500 });
  }
} 