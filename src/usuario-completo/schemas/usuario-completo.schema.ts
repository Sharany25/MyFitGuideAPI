import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioCompletoDocument = UsuarioCompleto & Document;

@Schema({ timestamps: true })
export class UsuarioCompleto {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  correoElectronico: string;

  @Prop()
  fechaNacimiento?: Date;

  @Prop()
  foto?: string;
  
  @Prop()
  genero?: string;

  @Prop()
  altura?: number;

  @Prop()
  peso?: number;

  @Prop()
  objetivo?: string;

  @Prop({ type: [String], default: [] })
  alergias?: string[];

  @Prop()
  presupuesto?: number;

  @Prop()
  edad?: number;

  @Prop({ type: [String], enum: ['gimnasio', 'casa', 'calistenia'], default: [] })
  preferencias?: string[];

  @Prop()
  dias?: number;

  @Prop()
  lesiones?: string;
}

export const UsuarioCompletoSchema = SchemaFactory.createForClass(UsuarioCompleto);
