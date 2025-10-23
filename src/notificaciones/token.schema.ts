import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Token extends Document {
  @Prop({ required: true, index: true, unique: true })
  userId: string; 
  @Prop({ required: true, type: [String] })
  fcmTokens: string[]; 
}

export const TokenSchema = SchemaFactory.createForClass(Token);