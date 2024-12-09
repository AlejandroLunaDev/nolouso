'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SocialLoginButton } from "./socialLoginbutton/SocialLoginButton";
import { LoginForm } from "./loginForm/LoginForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Login() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      // Redirige al endpoint de autenticación de Google en el backend
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    } catch (error) {
      console.error('Error durante la autenticación de Google:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) router.back();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-purple-800">
            Iniciar Sesión
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <SocialLoginButton
              provider="Google"
              onClick={handleGoogleLogin}
            />
            <SocialLoginButton
              provider="GitHub"
              onClick={() => console.log("GitHub login")}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">O</span>
            </div>
          </div>
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
