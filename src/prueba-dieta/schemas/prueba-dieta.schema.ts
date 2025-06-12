import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PruebaDietaDocument = PruebaDieta & Document;

@Schema({ timestamps: true })
export class PruebaDieta {
  @Prop({ required: true })
  userId: string; // ← NUEVO

  @Prop({ required: true })
  genero: string;

  @Prop({ required: true })
  altura: number;

  @Prop({ required: true })
  peso: number;

  @Prop({ required: true })
  objetivo: string;

  @Prop({ type: [String], default: [] })
  alergias: string[];

  @Prop({ required: true })
  presupuesto: number;
}

export const PruebaDietaSchema = SchemaFactory.createForClass(PruebaDieta);
