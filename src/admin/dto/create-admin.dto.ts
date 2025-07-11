import { IsEmail, IsString } from "class-validator";

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role?: 'Administrador' | 'Cliente';

  @IsString()
  activationToken?: string;
}