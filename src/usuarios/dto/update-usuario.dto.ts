import { IsOptional, IsString, IsEmail, IsDateString } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: Date;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsString()
  alergias?: string;

  @IsOptional()
  @IsString()
  contraseña?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;
}