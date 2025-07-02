import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type DietaiaDocument = Dietaia & Document;

@Schema({ timestamps: true })
export class Dietaia {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  genero: string;

  @Prop({ required: true })
  altura: number;

  @Prop({ required: true })
  peso: number;

  @Prop({ required: true })
  objetivo: string;

  @Prop({ type: [String] })
  alergias: string[];

  @Prop({ required: true })
  presupuesto: number;

  @Prop({ type: SchemaTypes.Mixed }) // <-- Aquí la clave para guardar JSON anidado correctamente
  resultado: any;
}

export const DietaiaSchema = SchemaFactory.createForClass(Dietaia);
