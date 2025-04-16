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

  @IsOptional() 
  @IsString()
  _id?: string;
}
