import { PartialType } from '@nestjs/mapped-types';
import { CreatePruebaRutinaDto } from './create-prueba-rutina.dto';

export class UpdatePruebaRutinaDto extends PartialType(CreatePruebaRutinaDto) {}
