import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

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
  contraseña: string;  // La contraseña es obligatoria

  @Prop()
  ubicacion?: string;
}

// Crear el esquema de usuario
export const UsuarioSchema = SchemaFactory.createForClass(Usuarios);

// Hook pre-save para encriptar la contraseña antes de guardar
UsuarioSchema.pre('save', async function (next) {
  const usuario = this as UsuarioDocument;

  // Si la contraseña no ha sido modificada, no realizamos la encriptación
  if (!usuario.isModified('contraseña')) return next();

  // Generar un salt para encriptar la contraseña
  const salt = await bcrypt.genSalt(10);

  // Encriptar la contraseña con el salt generado
  usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);

  // Continuar con el proceso de guardado
  next();
});

// Método para comparar la contraseña ingresada con la encriptada en la base de datos
UsuarioSchema.methods.compareContraseña = async function (password: string): Promise<boolean> {
  const usuario = this as UsuarioDocument;
  return await bcrypt.compare(password, usuario.contraseña);
};
