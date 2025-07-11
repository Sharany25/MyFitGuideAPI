import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'Cliente' })
  role: 'Administrador' | 'Cliente';

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ required: false })
activationToken?: string; 

}

export const AdminSchema = SchemaFactory.createForClass(Admin);
