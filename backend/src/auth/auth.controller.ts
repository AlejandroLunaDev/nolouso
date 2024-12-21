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
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

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
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  async loginUser(@Body() loginAuthDto: LoginAuthDto, @Res() res: Response) {
    return await this.authService.login(loginAuthDto, res);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect('http://localhost:3000', 302)
  async googleLoginRedirect(@Req() req: any, @Res() res: Response) {
    const profile = req.user;

    // Llama al servicio de autenticación para manejar el inicio de sesión
    await this.authService.googleLogin(profile, res);

    // Redirige al frontend con los tokens en las cookies
    return { url: 'http://localhost:3000' };
  }

  @Get('check')
  async checkAuth(@Req() req: any, @Res() res: Response) {
    const token = req.cookies['accessToken'];

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const user = await this.authService.checkAuth(token); // Pasamos el token al servicio para verificar
      return res.status(200).json(user); // Si el token es válido, devolvemos el usuario
    } catch {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
  }
}
