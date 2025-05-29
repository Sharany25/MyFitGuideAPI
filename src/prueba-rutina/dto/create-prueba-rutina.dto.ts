import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePruebaRutinaDto {
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

  @IsOptional()
  @IsString()
  lesiones?: string;
}
