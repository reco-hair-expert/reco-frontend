import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.includes("/slug")) {
    return NextResponse.error();
  }

  return NextResponse.next();
}
