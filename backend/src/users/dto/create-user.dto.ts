import { IsEmail, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Laura' }) // Ejemplo para Swagger
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'Martínez' }) // Ejemplo para Swagger
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ example: 'laura.martinez@example.com' }) // Ejemplo para Swagger
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'tu_contraseña_segura' }) // Ejemplo para Swagger
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'https://randomuser.me/api/portraits/women/50.jpg', required: false }) // Ejemplo opcional para Swagger
    @IsString()
    avatar?: string;

    @ApiProperty({ example: false, required: false }) // Ejemplo opcional para Swagger
    @IsBoolean()
    isPremium?: boolean;
}
