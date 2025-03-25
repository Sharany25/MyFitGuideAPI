import { IsString, IsOptional, IsNotEmpty, IsDecimal } from "class-validator";

export class UpdateRecetaDto {

  @IsOptional()
  @IsString()
  nombreReceta?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  costo?: string;

  @IsOptional()
  @IsDecimal()
  calorias?: number;
}
