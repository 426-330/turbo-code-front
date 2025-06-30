import { NextResponse } from 'next/server';

export async function POST() {
  // const { email, password } = await request.json();
  return NextResponse.json({ message: 'Hello, world!' });
}