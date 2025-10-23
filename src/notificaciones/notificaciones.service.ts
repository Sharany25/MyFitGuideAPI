import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FirebaseService } from '../firebase/firebase.service';
import { Token } from './token.schema'; 

@Injectable()
export class NotificationsService {

    constructor(
        
        @InjectModel(Token.name) private tokenModel: Model<Token>,
        private readonly firebaseService: FirebaseService,
    ) {}

  
    async saveToken(userId: string, fcmToken: string): Promise<Token> {
        return this.tokenModel.findOneAndUpdate(
            { userId: userId },
            { 
                $addToSet: { fcmTokens: fcmToken } 
            },
            { 
                new: true, 
                upsert: true, 
                setDefaultsOnInsert: true 
            }
        ).exec();
    }

  
    async getTokensByUserId(userId: string): Promise<string[]> {
        const doc = await this.tokenModel.findOne({ userId }).exec();
        return doc ? doc.fcmTokens : []; 
    }

 
    async sendNotificationToUser(userId: string, title: string, body: string) {
        const tokens = await this.getTokensByUserId(userId); 

        if (tokens.length === 0) {
            console.log(`[FCM] No hay tokens para el usuario ${userId}. Envío omitido.`);
            return;
        }

        return this.firebaseService.sendToMultipleDevices(tokens, title, body); 
    }


    async deleteToken(userId: string, fcmToken: string): Promise<void> {
        await this.tokenModel.updateOne(
            { userId: userId },
            { $pull: { fcmTokens: fcmToken } } 
        ).exec();
    }

    async getAllTokens(): Promise<string[]> {
        const tokenDocs = await this.tokenModel.find().exec();
        
        const allTokens = tokenDocs.flatMap(doc => doc.fcmTokens);
        
        return allTokens.filter(token => token && token.length > 0);
    }

 
   async sendNotificationToAllSubscribers(title: string, body: string, data: any = {}) { 
        const tokens = await this.getAllTokens();

        if (tokens.length === 0) {
            console.log(`[FCM] No hay suscriptores a los que enviar.`);
            return;
        }

        return this.firebaseService.sendToMultipleDevices(tokens, title, body, data); 
    }
}