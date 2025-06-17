import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, IsIn, Min, Max, IsOptional } from 'class-validator';

export class CrearRutinaDto {
  @IsString()
  userId: string;

  @IsString()
  nombre: string;

  @Type(() => Number)
  @IsNumber()
  edad: number;

  @IsString()
  objetivo: string;

  @IsArray()
  @IsIn(['gimnasio', 'casa', 'calistenia'], { each: true })
  preferencias: string[];

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(7)
  dias: number;

  @IsString()
  @IsOptional()
  lesiones?: string;
}
