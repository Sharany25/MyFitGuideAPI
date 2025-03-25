import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Rutina extends Document {
    @Prop({ required: true })
    idRutina: string;

    @Prop({ required: true })
    nombreRutina: string;

    @Prop({ required: true })
    descripcion: string;

    @Prop({ required: true })
    pasos: string;

    @Prop({ required: true })
    repeticiones: number;
}

export const RutinaSchema = SchemaFactory.createForClass(Rutina);
