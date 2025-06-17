import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop()
  alergias: string[];

  @Prop({ required: true })
  presupuesto: number;

  @Prop({ type: Object })
  resultado: any;

  // Agrega explícitamente los timestamps:
  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const DietaiaSchema = SchemaFactory.createForClass(Dietaia);
