import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );

    response.cookies.set('accessToken', '', {
      expires: new Date(0),
      path: '/',
    });
    
    response.cookies.set('refreshToken', '', {
      expires: new Date(0),
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ error: 'Error during logout' }, { status: 500 });
  }
} 