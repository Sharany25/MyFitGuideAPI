import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Favorito extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ type: [String], default: [] })
  ejercicios: string[];
}

export const FavoritoSchema = SchemaFactory.createForClass(Favorito);
