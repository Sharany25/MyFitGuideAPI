// src/rutinasIA/dto/update-rutina.dto.ts
import { IsString, IsNumber, IsArray, IsIn, Min, Max, IsOptional } from 'class-validator';

export class UpdateRutinaDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  edad?: number;

  @IsOptional()
  @IsString()
  objetivo?: string;

  @IsOptional()
  @IsArray()
  @IsIn(['gimnasio', 'casa', 'calistenia'], { each: true })
  preferencias?: string[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(7)
  dias?: number;
}
