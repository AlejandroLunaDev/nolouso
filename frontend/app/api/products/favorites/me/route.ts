import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/user-favorites`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    return NextResponse.json({ error: 'Error fetching user favorites' }, { status: 500 });
  }
}