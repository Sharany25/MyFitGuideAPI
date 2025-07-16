import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

//Metodo de creación para administrador
export class CreateAdminDto {
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  contrasena: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsNotEmpty()
  @IsString()
  rol: string;
}
