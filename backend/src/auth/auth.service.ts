import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
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
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.usersService.findByEmail(loginAuthDto.email);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const isPasswordValid = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );
    if (!isPasswordValid) throw new NotFoundException('Credenciales inválidas');

    const payload = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      avatar: user.avatar,
    };
    const token = this.jwtService.sign(payload);
    console.log(token);
    return { message: 'Inicio de sesión exitoso', token };
  }

  async googleLogin(profile: any) {
    const { email, firstName, lastName, profilePicture } = profile;

    // Busca al usuario en la base de datos
    let user = await this.usersService.findByEmail(email);

    // Si el usuario no existe, lo crea
    if (!user) {
      const createUserDto: CreateUserDto = {
        first_name: firstName,
        last_name: lastName,
        email,
        password: '123Pa$word', // Contraseña predeterminada, puedes ajustar esto
        avatar: profilePicture, // Foto de perfil de Google
        isPremium: false, // Configura según tu lógica de negocio
      };
      user = await this.register(createUserDto);
    } else {
      // Si el usuario ya existe, lo loguea
      const loginAuthDto: LoginAuthDto = {
        email: email,
        password: '123Pa$word', // Debes manejar esto con seguridad
      };
      return await this.login(loginAuthDto);
    }

    // Si se crea el usuario, generamos el token

    return { message: 'Inicio de sesión con Google exitoso' };
  }
}
