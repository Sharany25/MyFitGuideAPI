// src/rutinasIA/dto/crear-rutina.dto.ts
import { IsString, IsNumber, IsArray, IsIn, Min, Max } from 'class-validator';

export class CrearRutinaDto {
  @IsString()
  nombre: string;

  @IsNumber()
  edad: number;

  @IsString()
  objetivo: string;

  @IsArray()
  @IsIn(['gimnasio', 'casa', 'calistenia'], { each: true })
  preferencias: string[];

  @IsNumber()
  @Min(1)
  @Max(7)
  dias: number;
}
