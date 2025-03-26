import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ejercicio extends Document {
  @Prop({ required: true })
  idEjercicio: string;

  @Prop({ required: true })
  nombreEjercicio: string;

  @Prop({ required: true })
  grupoMuscular: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  nivelDificultad: string;

  @Prop({ required: true })
  calorias: number;

  @Prop({ required: true })
  areaEntrenamiento: string;
}

export const EjercicioSchema = SchemaFactory.createForClass(Ejercicio);
