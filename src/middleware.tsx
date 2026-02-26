import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {

    const token = request.cookies.get("shop-token")?.value

    const isProtected = request.nextUrl.pathname.startsWith("/userPanel")
    if (!token && isProtected) {
        return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    const isPublicOnly = request.nextUrl.pathname.startsWith("/auth")
    if (token && isPublicOnly) {
        return NextResponse.redirect(new URL("/userPanel", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/userPanel", "/auth/:path*"],
}