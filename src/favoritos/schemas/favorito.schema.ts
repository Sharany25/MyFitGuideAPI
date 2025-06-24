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

// Asegúrate de tener un índice en userId para mejorar la búsqueda por usuario
FavoritoSchema.index({ userId: 1 }, { unique: true });