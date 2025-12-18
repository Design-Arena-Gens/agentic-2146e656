import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
  const data = await request.json().catch(() => ({}));
  return NextResponse.json({
    received: true,
    timestamp: new Date().toISOString(),
    data,
  });
}
