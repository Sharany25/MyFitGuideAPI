import { IsNotEmpty, IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  idUsuario: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDateString()
  fechaNacimiento: Date;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsString()
  alergias?: string;

  @IsNotEmpty()
  @IsString()
  contraseña: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;
}
