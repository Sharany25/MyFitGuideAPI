import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DietaAIDocument = DietaAI & Document;

@Schema()
export class DietaAI {
  @Prop({ required: true })
  genero: string;

  @Prop({ required: true })
  altura: number;

  @Prop({ required: true })
  peso: number;

  @Prop({ required: true })
  objetivo: string;

  @Prop()
  alergias: string[];

  @Prop({ required: true })
  presupuesto: number;

  @Prop()
  resultado: string;
}

export const DietaAISchema = SchemaFactory.createForClass(DietaAI);