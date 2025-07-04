import { NextResponse } from 'next/server';
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  const userId = 1;

  // @ts-expect-error - DB is not defined in the context
  const db = getCloudflareContext().env.DB;
  const stmt = await db.prepare(`SELECT * FROM user WHERE id = ?`).bind(userId);
  const returnValue = await stmt.first();
  return NextResponse.json(returnValue);
}