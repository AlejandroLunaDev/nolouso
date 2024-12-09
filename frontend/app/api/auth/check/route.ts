import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');

    if (!accessToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ 
      authenticated: true,
      token: accessToken.value 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error checking auth' }, { status: 500 });
  }
} 