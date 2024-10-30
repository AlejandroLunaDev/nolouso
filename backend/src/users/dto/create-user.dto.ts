import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  Length,
  IsOptional,
  IsUrl,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Laura' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50) // Longitud máxima de 50 caracteres
  @Matches(/^[A-Za-zÀ-ÿ]+$/, {
    message: 'first_name must contain only letters',
  }) // Solo letras
  first_name: string;

  @ApiProperty({ example: 'Martínez' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50) // Longitud máxima de 50 caracteres
  @Matches(/^[A-Za-zÀ-ÿ]+$/, { message: 'last_name must contain only letters' }) // Solo letras
  last_name: string;

  @ApiProperty({ example: 'laura.martinez@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123Pa$word' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 100) // Longitud mínima de 8 caracteres
  @Matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])/, {
    message:
      'password must contain at least one number, one uppercase letter, and one special character',
  }) // Requisitos de complejidad
  password?: string;

  @ApiProperty({
    example: 'https://randomuser.me/api/portraits/women/50.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'avatar must be a valid URL' }) // Validar URL
  avatar?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isPremium?: boolean;
}
