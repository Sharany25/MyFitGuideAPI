import { PartialType } from '@nestjs/mapped-types';
import { CreateRutinaDto } from './create-rutina.dto';

export class UpdateRutinaDto extends PartialType(CreateRutinaDto) {}
