'use client';

import { useState, useEffect } from 'react';
import { FrontendUser } from '../adapters/types/user';
import { userAdapter } from '../adapters/user/userAdapter';
import { jwtDecode } from "jwt-decode";

interface JwtCustomPayload {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  avatar: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<FrontendUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();

        if (data.authenticated && data.token) {
          const decodedToken = jwtDecode<JwtCustomPayload>(data.token);
          const backendUser = {
            first_name: decodedToken.first_name,
            last_name: decodedToken.last_name,
            email: decodedToken.email,
            role: decodedToken.role,
            avatar: decodedToken.avatar,
            isPremium: false,
            documents: [],
            last_connection: new Date(),
          };
          
          setUser(userAdapter(backendUser));
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return { user, loading, logout };
}; 