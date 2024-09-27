import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth') // Etiqueta para agrupar los endpoints de autenticación
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint para registrar un nuevo usuario
  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' }) // Descripción del endpoint
  @ApiBody({ type: RegisterAuthDto }) // Tipo del cuerpo de la solicitud
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente.',
  }) // Respuesta esperada
  @ApiResponse({
    status: 400,
    description: 'Error de validación o usuario ya existe.',
  }) // Respuesta en caso de error
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  // Endpoint para iniciar sesión (login)
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' }) // Descripción del endpoint
  @ApiBody({ type: LoginAuthDto }) // Tipo del cuerpo de la solicitud
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' }) // Respuesta esperada
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' }) // Respuesta en caso de error
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}
