import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv'; // Cargar dotenv
import { JwtPayload } from '../interfaces/jwt-payload.interface';

// Cargar las variables de entorno desde .env
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Acceder directamente a la variable de entorno
    });
  }

  async validate(payload: JwtPayload) {
    return {
      userId: payload.sub, // ID del usuario
      email: payload.email, // Email del usuario
      role: payload.role, // Rol del usuario
      first_name: payload.first_name, // Nombre del usuario
      last_name: payload.last_name, // Apellido del usuario
      avatar: payload.avatar, // URL del avatar
    };
  }
}
