import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ingrediente extends Document {
    @Prop({ required: true })
    idIngredientes: string;

    @Prop({ required: true })
    nombreIngrediente: string;

    @Prop({ required: true })
    costo: number;

    @Prop({ required: true })
    link: string;
}

export const IngredienteSchema = SchemaFactory.createForClass(Ingrediente);
