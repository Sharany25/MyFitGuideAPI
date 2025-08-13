import { IsNotEmpty, IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';

export class CreateUsuarioDto {
  @IsOptional()
  @IsString()
  idUsuario?: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsEmail()
  correoElectronico: string;

  @IsNotEmpty()
  @IsDateString()
  fechaNacimiento: string;

  @IsNotEmpty()
  @IsString()
  contraseña: string;

  @IsNotEmpty()
  @IsString()
  foto?: string;

  @IsOptional()
  @IsString()
  _id?: string;
}
