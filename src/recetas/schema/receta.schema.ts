import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Receta extends Document {
  
  @Prop({ required: true })
  idReceta: string;

  @Prop({ required: true })
  nombreReceta: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  costo: string;

  @Prop({ required: true })
  calorias: number;
  
}

export const RecetaSchema = SchemaFactory.createForClass(Receta);
