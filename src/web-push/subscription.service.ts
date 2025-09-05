import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription, PushSubscription } from './schemas/subscription.schema';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
  ) {}

  async addSubscription(sub: PushSubscription): Promise<Subscription> {
    console.log('Nueva suscripción recibida:', sub.endpoint);

    const createdSubscription = new this.subscriptionModel(sub);
  try {
    const savedSubscription = await createdSubscription.save();
    console.log('Suscripción guardada en DB:', savedSubscription.endpoint);
    return savedSubscription;
  } catch (error) {
    console.error('Error guardando suscripción:', error);    
      throw error;
    }
  }

  async getAll(): Promise<Subscription[]> {
    return this.subscriptionModel.find().exec();
  }

  async removeSubscription(endpoint: string): Promise<any> {
    console.log('Eliminando suscripción:', endpoint);
    return this.subscriptionModel.deleteOne({ endpoint }).exec();
  }

}