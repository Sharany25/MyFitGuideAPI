import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Dieta extends Document {
  @Prop({ required: true })
  idDieta: string;

  @Prop({ required: true })
  NombreDieta: string;

  @Prop({ required: true, type: Date })
  fechaInicio: Date;

  @Prop({ required: true, type: Date })
  fechaFin: Date;

  @Prop({ required: true })
  diaSemana: string;

  @Prop({ required: true })
  tiempo: string;
}

export const DietaSchema = SchemaFactory.createForClass(Dieta);
