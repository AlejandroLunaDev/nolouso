'use client';

export function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
    >
      <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
      Continuar con Google
    </button>
  );
} 