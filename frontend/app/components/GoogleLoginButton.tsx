'use client';

import Image from "next/image";

export function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
    >
      <Image width={24} height={24} src="/google-icon.svg" alt="Google" />
      Continuar con Google
    </button>
  );
} 