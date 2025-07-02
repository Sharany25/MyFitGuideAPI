import { IsString, IsNumber, IsArray, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateDietaiaDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  genero: string;

  @IsNotEmpty()
  @IsNumber()
  altura: number;

  @IsNotEmpty()
  @IsNumber()
  peso: number;

  @IsNotEmpty()
  @IsString()
  objetivo: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  alergias?: string[];

  @IsNotEmpty()
  @IsNumber()
  presupuesto: number;

  @IsOptional()
  resultado?: any;
}
