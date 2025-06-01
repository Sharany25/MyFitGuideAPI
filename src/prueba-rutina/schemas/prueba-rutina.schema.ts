import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PruebaRutinaDocument = PruebaRutina & Document;

@Schema({ timestamps: true })
export class PruebaRutina {
  @Prop({ required: true })
  userId: number;      // <-- AGREGA ESTO

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  edad: number;

  @Prop({ required: true })
  objetivo: string;

  @Prop({ type: [String], enum: ['gimnasio', 'casa', 'calistenia'] })
  preferencias: string[];

  @Prop({ required: true })
  dias: number;

  @Prop()
  lesiones?: string;
}

export const PruebaRutinaSchema = SchemaFactory.createForClass(PruebaRutina);
