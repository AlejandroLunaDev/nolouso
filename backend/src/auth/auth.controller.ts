import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  UseGuards,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 409, description: 'El correo ya está en uso.' })
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) // Establece el código de estado a 200
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.login(loginAuthDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {}

  // Callback que Google llama después de autenticar al usuario
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect('http://localhost:3000', 302)
  async googleLoginRedirect(@Req() req: any) {
    const profile = req.user; // Aquí, 'user' se establece por el guard de Google

    // Llama al servicio de autenticación para manejar el inicio de sesión
    await this.authService.googleLogin(profile);

    return {
      url: 'http://localhost:3000',
      statusCode: 302,
    };
    // Aquí puedes manejar el redireccionamiento después de un login exitoso
  }
}
