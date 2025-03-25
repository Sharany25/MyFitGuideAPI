import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Metrica extends Document {
  @Prop({ required: true })
  idMetricas: string;

  @Prop()
  estatura: number;

  @Prop()
  peso: number;

  @Prop()
  pulsaciones: number;

  @Prop()
  nivelActividad: string;

  @Prop()
  masaMuscular: number;
}

export const MetricaSchema = SchemaFactory.createForClass(Metrica);
