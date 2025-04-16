import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Metrica extends Document {
  @Prop({ required: true })
  idMetricas: string;

  @Prop({ required: true })
  genero: string;

  @Prop({ required: true })
  altura: number;

  @Prop({ required: true })
  peso: number;

  @Prop()
  objetivo: string;

  @Prop({ type: [String] }) // Define alergias como un array de strings
  alergias: string[];
}

export const MetricaSchema = SchemaFactory.createForClass(Metrica);