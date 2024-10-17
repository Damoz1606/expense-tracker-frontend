import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest, event: any) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    if (req.nextUrl.pathname.startsWith('/auth') && isAuthenticated) {
        return NextResponse.redirect(new URL('/app', req.url));
    }

    if (req.nextUrl.pathname.startsWith('/app') && !isAuthenticated) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    const authMiddleware = withAuth({
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: '/auth/login',
            signOut: '/auth/login',
        },
    });
    return authMiddleware(req as any, event);
}

export const config = {
    // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
    matcher: ["/app/:path*"]
}