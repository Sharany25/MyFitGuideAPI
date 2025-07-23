import { Controller, Post, Body } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('push')
export class PushController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('subscribe')
  subscribe(@Body() subscription: any) {
    this.subscriptionService.addSubscription(subscription);
    return { message: 'Suscripción guardada' };
  }
}
