import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const { id } = await Promise.resolve(context.params);

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/favorite/${id}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store'
      }
    );

    console.log('Token:', accessToken);
    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return NextResponse.json(
      { error: 'Error toggling favorite' }, 
      { status: 500 }
    );
  }
} 