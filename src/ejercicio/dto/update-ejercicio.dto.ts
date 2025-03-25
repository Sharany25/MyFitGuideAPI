import { PartialType } from '@nestjs/mapped-types';
import { CreateEjercicioDto } from './create-ejercicio.dto';

export class UpdateEjercicioDto extends PartialType(CreateEjercicioDto) {}
