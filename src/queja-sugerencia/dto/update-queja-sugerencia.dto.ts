import { PartialType } from '@nestjs/swagger';
import { CreateQuejaSugerenciaDto } from './create-queja-sugerencia.dto';

export class UpdateQuejaSugerenciaDto extends PartialType(CreateQuejaSugerenciaDto) {}
