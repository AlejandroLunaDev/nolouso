import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service'; // Importa el servicio de usuarios
import * as bcrypt from 'bcrypt'; // Para encriptar contraseñas
import { User } from '../users/schema/user.schema'; // Importa el modelo de usuario
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('El correo ya está en uso');
    }

    // Crear el nuevo usuario
    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }

  async login(loginAuthDto: LoginAuthDto) {
    // Buscar el usuario por correo
    const user: User = await this.usersService.findByEmail(loginAuthDto.email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Validar la contraseña
    const isPasswordValid = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('Credenciales inválidas');
    }
    const payload = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    // Aquí puedes retornar un token o la información del usuario según tu lógica
    return { message: 'Inicio de sesión exitoso', token };
  }
}
