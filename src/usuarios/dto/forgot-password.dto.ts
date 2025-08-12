import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  correoElectronico: string;
}