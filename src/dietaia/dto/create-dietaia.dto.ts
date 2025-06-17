  import { IsString, IsNumber, IsArray, IsOptional, ArrayNotEmpty, IsNotEmpty } from 'class-validator';

  export class CreateDietaiaDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsString()
    genero: string;

    @IsNumber()
    altura: number;

    @IsNumber()
    peso: number;

    @IsString()
    objetivo: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    alergias?: string[];

    @IsNumber()
    presupuesto: number;

    @IsOptional()
    @IsString()
    resultado?: string;
  }
