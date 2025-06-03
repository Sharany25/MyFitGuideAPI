import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuariosDocument = Usuarios & Document;

@Schema()
export class Usuarios {
  @Prop({ required: true, unique: true })
  correoElectronico: string;

  @Prop({ required: true })
  nombre: string;

  @Prop()
  fechaNacimiento?: Date;

  @Prop({ required: true })
  contraseña: string;

  @Prop()
  ubicacion?: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuarios);
