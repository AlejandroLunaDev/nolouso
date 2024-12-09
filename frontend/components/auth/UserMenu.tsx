'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center space-x-2 hover:opacity-80">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.firstName} />
          <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{user.firstName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem className="flex items-center" onClick={logout}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 