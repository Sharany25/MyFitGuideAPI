import { PartialType } from '@nestjs/mapped-types';
import { CreateDietaiaDto } from './create-dietaia.dto';

export class UpdateDietaiaDto extends PartialType(CreateDietaiaDto) {}
