import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface JwtCustomPayload {
  role: string;
  email: string;
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  // Proteger rutas de admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const decoded = jwtDecode<JwtCustomPayload>(accessToken);
      if (decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirigir admin a dashboard
  if (accessToken) {
    try {
      const decoded = jwtDecode<JwtCustomPayload>(accessToken);
      if (decoded.role === 'admin' && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/admin/:path*']
}; 