import { IsString, IsOptional, IsIn, IsEmail } from 'class-validator';

export class CreateQuejaSugerenciaDto {
  @IsString()
  tipo: 'queja' | 'sugerencia';

  @IsString()
  mensaje: string;

  @IsOptional()
  @IsString()
  usuarioId?: string;

  @IsOptional()
  @IsEmail()
  emailContacto?: string;

  @IsString()
  @IsIn(['acceso', 'funcionalidad'])
  categoria: 'acceso' | 'funcionalidad';

  @IsOptional()
  @IsString()
  estado?: 'nuevo' | 'en revisión' | 'respondido' | 'cerrado';

  @IsOptional()
  @IsString()
  respuesta?: string;

  @IsOptional()
  fechaRespuesta?: Date;
}
