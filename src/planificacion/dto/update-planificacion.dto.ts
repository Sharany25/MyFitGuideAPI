import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanificacionDto } from './create-planificacion.dto';

export class UpdatePlanificacionDto extends PartialType(CreatePlanificacionDto) {}
