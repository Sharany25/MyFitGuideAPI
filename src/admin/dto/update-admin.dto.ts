import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  contrasena?: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsOptional()
  @IsString()
  rol?: string;
}
