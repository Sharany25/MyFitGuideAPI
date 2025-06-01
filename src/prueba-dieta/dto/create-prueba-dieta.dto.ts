import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePruebaDietaDto {
  @IsNotEmpty()
  @IsString()
  genero: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  altura: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  peso: number;

  @IsNotEmpty()
  @IsString()
  objetivo: string;

  @IsArray()
  @IsString({ each: true })
  alergias: string[];

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  presupuesto: number;
}
