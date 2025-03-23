import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from "bcrypt";

export type UsuarioDocument = Usuarios & Document;

@Schema()
export class Usuarios {
  @Prop({ required: true })
  idUsuario: number;

  @Prop({ required: true })
  nombre: string;

  @Prop({ type: Date })
  fechaNacimiento: Date;

  @Prop()
  genero?: string;

  @Prop()
  alergias?: string;

  @Prop({ required: true })
  contraseña: string;

  @Prop()
  ubicacion?: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuarios);

UsuarioSchema.pre("save", async function (next) {
  const usuario = this as UsuarioDocument;
  if (!usuario.isModified("contraseña")) return next();
  const salt = await bcrypt.genSalt(10);
  usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);
  next();
});
