import { PartialType } from '@nestjs/swagger';
import { UsuarioCompletoDto } from './create-usuario-completo.dto';

export class UpdateUsuarioCompletoDto extends PartialType(UsuarioCompletoDto) {}
