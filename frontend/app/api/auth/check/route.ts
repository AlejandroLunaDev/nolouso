import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  avatar?: string;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(null, { status: 401 });
    }

    try {
      const decodedToken = jwtDecode<JwtPayload>(accessToken);
      
      const fullName = decodedToken.first_name && decodedToken.last_name
        ? `${decodedToken.first_name} ${decodedToken.last_name}`
        : 'Usuario';

      const user = {
        id: decodedToken.sub || '',
        name: fullName,
        email: decodedToken.email || '',
        role: decodedToken.role || 'user',
        avatar: decodedToken.avatar || null
      };

      return NextResponse.json(user);
    } catch (decodeError) {
      console.error('Error decoding token:', decodeError);
      return NextResponse.json(null, { status: 401 });
    }
  } catch (error) {
    console.error('Error checking auth:', error);
    return NextResponse.json(null, { status: 401 });
  }
} 