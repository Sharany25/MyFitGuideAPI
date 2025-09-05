import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PushService } from './push.service';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class NotificationTaskService {
  constructor(
    private readonly pushService: PushService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

@Cron('0 10 * * *', { name: 'envioPushDiario10am' })
  async sendScheduledNotification() {
    const subscriptions = this.subscriptionService.getAll();

    for (const sub of await subscriptions) {
      await this.pushService.sendNotification(sub, {
        title: "Domina tu Fitness con MyFitGuide!",
        body: "Aprende a usar todas las funcionalidades de MyFitGuide para alcanzar tus objetivos.",
        icon: "https://i.imgur.com/QhMLrZZ.jpeg",
        url: "https://studio--smartbit-health-hub.us-central1.hosted.app/quick-start",
        actions: [
          { action: "tutorial", title: "Ver Tutorial" },
          { action: "guia", title: "Guía Rápida" }
        ]
      });
    }
  }
}
