import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

//Schema o esqueleto de guardado en BD-MongoDB.
@Schema()
export class Admin {
  @Prop({ required: true, unique: true })
  correo: string;

  @Prop({ required: true })
  contrasena: string;

  @Prop()
  foto?: string;

  @Prop({ required: true })
  rol: string;

  @Prop()
  verificationToken?: string;

  @Prop({ default: false })
  isVerified: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
