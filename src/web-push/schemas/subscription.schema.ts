import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

@Schema()
export class Subscription extends Document {
  @Prop({ required: true, unique: true })
  endpoint: string;
  @Prop({ type: Object, required: true }) // Guardamos las claves como un objeto
  keys: {
    p256dh: string;
    auth: string;
  };
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);