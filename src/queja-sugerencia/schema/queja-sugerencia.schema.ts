import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuejaSugerenciaDocument = QuejaSugerencia & Document;

@Schema({ timestamps: true })
export class QuejaSugerencia {
  @Prop({ required: true, enum: ['queja', 'sugerencia'] })
  tipo: 'queja' | 'sugerencia';

  @Prop({ required: true })
  mensaje: string;

  @Prop()
  usuarioId?: string;

  @Prop()
  emailContacto?: string;

  @Prop({ required: true, enum: ['acceso', 'funcionalidad'] })
  categoria: 'acceso' | 'funcionalidad';

  @Prop({ enum: ['nuevo', 'en revisión', 'respondido', 'cerrado'], default: 'nuevo' })
  estado?: 'nuevo' | 'en revisión' | 'respondido' | 'cerrado';

  @Prop()
  respuesta?: string;

  @Prop()
  fechaRespuesta?: Date;
}

export const QuejaSugerenciaSchema = SchemaFactory.createForClass(QuejaSugerencia);
