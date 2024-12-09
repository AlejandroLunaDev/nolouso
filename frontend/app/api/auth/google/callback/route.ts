import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const userID = searchParams.get("userID");
  const name = searchParams.get("name");

  if (!accessToken || !refreshToken || !userID || !name) {
    return NextResponse.redirect(new URL("/login?error=AuthFailed", req.url));
  }

  // Guardar tokens en cookies seguras
  const response = NextResponse.redirect(new URL("/", req.url));
  
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 // 15 minutos
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 // 7 días
  });

  return response;
}
