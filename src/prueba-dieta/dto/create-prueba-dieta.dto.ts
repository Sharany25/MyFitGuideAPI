import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreatePruebaDietaDto {
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

  @IsArray()
  @IsString({ each: true })
  alergias: string[];

  @IsNotEmpty()
  @IsString()
  presupuesto: number;
}
