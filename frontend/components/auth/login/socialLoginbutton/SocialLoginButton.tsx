import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function SocialLoginButton({ provider, onClick }: { provider: string; onClick: () => void }) {
    const icons: Record<string, JSX.Element> = {
      google: <FcGoogle className="mr-2 h-4 w-4" />,
      github: <FaGithub className="mr-2 h-4 w-4" />,
    };
  
    return (
      <Button
        variant="outline"
        className="w-full border-2"
        onClick={onClick}
      >
        {icons[provider.toLowerCase()]}
        {`Iniciar sesión con ${provider}`}
      </Button>
    );
  }