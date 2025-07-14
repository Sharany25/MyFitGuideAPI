import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
