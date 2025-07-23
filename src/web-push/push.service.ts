import { Injectable } from '@nestjs/common';
import * as webpush from 'web-push';

interface PushPayload {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  url?: string;
  actions?: { action: string; title: string }[];
}

@Injectable()
export class PushService {
  constructor() {
    webpush.setVapidDetails(
      'mailto:myfitguide2025@gmail.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
  }

  async sendNotification(subscription: any, payload: PushPayload) {
    const data = JSON.stringify(payload);

    try {
      await webpush.sendNotification(subscription, data);
    } catch (error) {
      console.error('Error enviando notificación:', error);
    }
  }
}
