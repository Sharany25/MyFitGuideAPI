import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App;

  constructor(private configService: ConfigService) {
    const serviceAccount: admin.ServiceAccount = {
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      privateKey: this.configService
        .get<string>('FIREBASE_PRIVATE_KEY')
        ?.replace(/\\n/g, '\n'),
    };

    if (!admin.apps.length) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('Firebase Admin SDK inicializado correctamente.');
    } else {
      this.firebaseApp = admin.app();
    }
  }

  //Envía una notificación a un token individual.
   
async sendPushNotification(
  fcmToken: string,
  title: string,
  body: string,
  data: Record<string, string> = {},
  imageUrl?: string, 
) {
  const message: admin.messaging.Message = {
    notification: { 
      title, 
      body
    },
    data: {
      ...data,
      ...(imageUrl ? { image: imageUrl } : {}) 
    },
    token: fcmToken,
  };

  try {
    const response = await this.firebaseApp.messaging().send(message);
    console.log('Notificación enviada correctamente:', response);
    return response;
  } catch (error) {
    console.error('Error al enviar mensaje a un token:', error);
    throw error;
  }
}

  //Envía notificaciones a múltiples tokens.
   
  async sendToMultipleDevices(
    fcmTokens: string[],
    title: string,
    body: string,
    data: any = {},
    imageUrl?: string, 
  ) {
    const messages: admin.messaging.Message[] = fcmTokens.map(token => ({
  notification: { 
    title, 
    body
    
  },
  data: {
    ...data,
    image: "https://i.imgur.com/wxoocAI.png"
  },
  token,
}));


    try {
      const messaging: any = this.firebaseApp.messaging();

      if (typeof messaging.sendAll === 'function') {
        const response = await messaging.sendAll(messages);
        console.log(`Notificaciones enviadas a ${response.successCount} dispositivos.`);
        return response;
      }

      console.warn('sendAll() no disponible. Enviando notificaciones individualmente...');
      const results: { success: boolean; res?: string; error?: any }[] = [];

      for (const msg of messages) {
        try {
          const res = await messaging.send(msg);
          results.push({ success: true, res });
        } catch (error) {
          console.error('Error al enviar a un token:', error);
          results.push({ success: false, error });
        }
      }

      return results;
    } catch (error) {
      console.error('Error al enviar notificación masiva:', error);
      throw error;
    }
  }
}
