import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const mode = process.env.NEXT_PUBLIC_APP_MODE;
    const { pathname } = request.nextUrl;

    // 1. User Mode: Prevent access to /admin routes
    if (mode === 'user' && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 2. Admin Mode: Redirect root / to /admin
    if (mode === 'admin' && pathname === '/') {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // 3. Admin Authentication (Existing Logic)
    if (pathname.startsWith('/admin/dashboard')) {
        const authCookie = request.cookies.get('admin_auth');

        if (authCookie?.value !== 'true') {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/admin/:path*'],
};
