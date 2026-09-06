import { NextResponse } from "next/server";

// Lightweight health endpoint referenced as the `status` link in the API catalog.
export function GET() {
  return NextResponse.json({ status: "ok" });
}
