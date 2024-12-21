import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Response } from 'express';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Método de registro reutilizado
  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('El correo ya está en uso');
    }
    return await this.usersService.create(createUserDto);
  }

  // Método de login normal
  async login(loginAuthDto: LoginAuthDto, res: Response) {
    const user = await this.usersService.findByEmail(loginAuthDto.email);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const isPasswordValid = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );
    if (!isPasswordValid) throw new NotFoundException('Credenciales inválidas');

    const payload = {
      sub: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      avatar: user.avatar,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    const isProd = process.env.NODE_ENV === 'production';
    // Establece las cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true, // No se puede acceder desde el frontend
      secure: isProd, // Solo en HTTPS
      sameSite: 'lax', // Asegura que la cookie se envíe en solicitudes de origen cruzado
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    return { message: 'Inicio de sesión exitoso' };
  }

  async googleLogin(profile: any, res: Response) {
    const { email, firstName, lastName, profilePicture } = profile;
    let user = await this.usersService.findByEmail(email);

    if (!user) {
      // Si el usuario no existe, lo creamos
      const createUserDto: CreateUserDto = {
        first_name: firstName,
        last_name: lastName,
        email,
        password: await bcrypt.hash(Math.random().toString(36), 10), // Contraseña aleatoria segura
        avatar: profilePicture,
        isPremium: false,
        favorites: [],
      };

      user = await this.register(createUserDto);
    }

    // Generamos los tokens y establecemos las cookies
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      avatar: user.avatar,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: false });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });

    return { message: 'Inicio de sesión con Google exitoso' };
  }

  async checkAuth(token: string) {
    try {
      const decoded = this.jwtService.verify(token); // Verificamos y decodificamos el token
      return decoded; // Devolvemos el payload del token
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
