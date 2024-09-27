import { IsString, IsOptional, MinLength, IsEmail } from 'class-validator';

export class UpdateAuthDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  // Si manejas roles de usuario, podrías incluir el campo role:
  @IsOptional()
  @IsString()
  role?: string;
}
