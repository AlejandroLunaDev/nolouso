import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Servicio de usuarios
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserDocument } from '../users/schema/users.schema'; // Importar el tipo UserDocument
import { JwtPayload } from './interfaces/jwt-payload.interface'; // Interface para el payload del JWT

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Inyectar el servicio de usuarios
    private jwtService: JwtService, // Servicio de JWT
  ) {}

  // Método para registrar un nuevo usuario
  async register(
    registerAuthDto: RegisterAuthDto,
  ): Promise<{ message: string; userId: string; email: string }> {
    const { email } = registerAuthDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está en uso');
    }

    // Crear un nuevo usuario
    const newUser: UserDocument =
      await this.usersService.create(registerAuthDto);

    return {
      message: 'Usuario registrado correctamente',
      userId: newUser._id.toString(), // Convertir ObjectId a string
      email: newUser.email,
    };
  }

  // Método para loguear a un usuario
  async login(loginAuthDto: LoginAuthDto): Promise<{
    accessToken: string;
    user: { id: string; email: string; role: string };
  }> {
    const { email, password } = loginAuthDto;

    // Buscar al usuario por email
    const user: UserDocument = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Verificar la contraseña usando bcrypt
    const isPasswordValid = await this.usersService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Generar el token JWT con la información del usuario
    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      user: {
        id: user._id.toString(), // Convertir ObjectId a string
        email: user.email,
        role: user.role,
      },
    };
  }
}
