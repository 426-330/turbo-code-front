import { NextRequest, NextResponse } from 'next/server';

import { getUserIdentifier, fakeDbCheckSubscription } from '../../common/utils';
import type { CheckSubscriptionRequest, CheckSubscriptionResponse } from '../../common/types';

export async function POST(req: NextRequest) {
  const body: CheckSubscriptionRequest = await req.json();
  const user = getUserIdentifier(body);
  if (!user.token && !user.username && !user.deviceId) {
    return NextResponse.json<CheckSubscriptionResponse>({ subscribed: false }, { status: 400 });
  }
  const result = await fakeDbCheckSubscription(user);
  return NextResponse.json<CheckSubscriptionResponse>(result);
} 