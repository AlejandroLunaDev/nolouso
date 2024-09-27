// src/auth/interfaces/jwt-payload.interface.ts

export interface JwtPayload {
  sub: string; // El ID del usuario
  email: string; // El email del usuario
  role: string; // El rol del usuario (por ejemplo, 'admin', 'user', 'premium')
  first_name?: string; // Nombre del usuario (opcional)
  last_name?: string; // Apellido del usuario (opcional)
  avatar?: string; // URL del avatar (opcional)
}
