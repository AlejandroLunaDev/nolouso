import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

export function LoginForm() {
    return (
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico:</Label>
          <Input
            id="email"
            type="email"
            placeholder="Ingresa tu correo"
            className="border-2"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña:</Label>
          <Input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            className="border-2"
            required
          />
        </div>
        <div className="text-sm">
          <Link
            href="/reset-password"
            className="text-purple-800 hover:text-purple-700"
          >
            ¿Olvidaste tu contraseña? Restablecer
          </Link>
        </div>
        <Button type="submit" className="w-full bg-[#61005d] hover:bg-purple-900">
          Iniciar sesión
        </Button>
      </form>
    );
  }