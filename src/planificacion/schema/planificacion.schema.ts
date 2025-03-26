import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Planificacion extends Document {
  @Prop({ required: true })
  idPlanificacion: string;

  @Prop({ required: true })
  planificacion: string;

  @Prop({ required: true })
  grupoMuscular: string;

  @Prop({ required: true })
  diaSemana: Date;
}

export const PlanificacionSchema = SchemaFactory.createForClass(Planificacion);
