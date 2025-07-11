import { IsEmail, IsString, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail()
  correoElectronico: string;

  @IsString()
  contraseña: string;
}
