import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();
  
  // Eliminar ambas cookies
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  
  // Configurar la respuesta para eliminar las cookies en el cliente también
  const response = NextResponse.json({ success: true });
  
  response.cookies.set('accessToken', '', {
    expires: new Date(0),
    path: '/',
  });
  
  response.cookies.set('refreshToken', '', {
    expires: new Date(0),
    path: '/',
  });

  return response;
} 