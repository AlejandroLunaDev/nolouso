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
}
