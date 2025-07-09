import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Favorito extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ type: [String], default: [] })
  ejercicios: string[];

  @Prop({ type: [String], default: [] })
  comidas: string[];
}

export const FavoritoSchema = SchemaFactory.createForClass(Favorito);

FavoritoSchema.index({ userId: 1 }, { unique: true });