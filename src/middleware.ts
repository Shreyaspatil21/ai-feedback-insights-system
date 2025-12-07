import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if we are accessing a protected route
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
        const authCookie = request.cookies.get('admin_auth');

        // Validate cookie value (in real world, verify JWT/Session ID)
        if (authCookie?.value !== 'true') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/dashboard/:path*',
};
