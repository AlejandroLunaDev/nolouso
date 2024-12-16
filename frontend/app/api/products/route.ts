import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?page=${page}&limit=${limit}`, 
      {
        headers: {
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error fetching products' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Error fetching products' },
      { status: 500 }
    );
  }
}
