import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class CreateMetricaDto {
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
}