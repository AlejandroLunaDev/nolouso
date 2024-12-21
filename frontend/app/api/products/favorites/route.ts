import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/favorites`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        }
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { error: 'Error fetching favorites' },
      { status: 500 }
    );
  }
}
