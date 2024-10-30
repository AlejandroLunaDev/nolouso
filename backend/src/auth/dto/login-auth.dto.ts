import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ example: 'laura.martinez@example.com' }) // Ejemplo para Swagger
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123Pa$word' }) // Ejemplo para Swagger
  @IsString()
  @IsNotEmpty()
  password: string;
}
