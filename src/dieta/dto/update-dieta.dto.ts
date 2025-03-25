import { PartialType } from '@nestjs/mapped-types';
import { CreateDietaDto } from './create-dieta.dto';
import { IsOptional, IsString, IsDate } from 'class-validator';

export class UpdateDietaDto extends PartialType(CreateDietaDto) {
  @IsOptional()
  @IsString()
  idDieta?: string;

  @IsOptional()
  @IsString()
  NombreDieta?: string;

  @IsOptional()
  @IsDate()
  fechaInicio?: Date;

  @IsOptional()
  @IsDate()
  fechaFin?: Date;

  @IsOptional()
  @IsString()
  diaSemana?: string;

  @IsOptional()
  @IsString()
  tiempo?: string;
}
