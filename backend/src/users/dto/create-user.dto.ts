import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  first_name: string;

  @IsOptional()
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  last_name?: string;

  @IsOptional()
  @IsString({ message: 'La edad debe ser una cadena de texto' })
  age?: string; // Si es un número, considera usar un tipo numérico

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsOptional()
  @IsString({ message: 'El DNI debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
  dni?: string; // DNI es opcional pero único en la base de datos
  // DNI es opcional pero único en la base de datos
}
