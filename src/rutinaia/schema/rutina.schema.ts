import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RutinaDocument = Rutina & Document;

@Schema({ timestamps: true })
export class Rutina {
  @Prop({ required: true })
  userId: string;

  @Prop()
  nombre: string;

  @Prop()
  edad: number;

  @Prop()
  objetivo: string;

  @Prop([String])
  preferencias: string[];

  @Prop()
  dias: number;

  // Nuevo: rutina como objeto JSON o string
  @Prop({ type: Object })
  rutina: any;

  @Prop()
  lesiones?: string;

  // Campos de timestamps explícitos para TypeScript
  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const RutinaSchema = SchemaFactory.createForClass(Rutina);
