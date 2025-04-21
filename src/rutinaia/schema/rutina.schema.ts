// src/rutinasIA/schemas/rutina.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Rutina extends Document {
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

  @Prop()
  rutinaGenerada: string;
}


export const RutinaSchema = SchemaFactory.createForClass(Rutina);
