import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = cookies();
    
    // Eliminar las cookies estableciendo una fecha de expiración en el pasado
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json({ message: 'Logout successful' }, { 
      status: 200,
      headers: {
        'Set-Cookie': [
          'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
          'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
        ]
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error during logout' }, { status: 500 });
  }
} 