import { IsEmail, IsOptional, IsString } from 'class-validator';

//Metodo de modificación para administrador (Opcional o posible uso a futuro)
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
