import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreatePruebaRutinaDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

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
