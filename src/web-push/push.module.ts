import { Module } from '@nestjs/common';
import { PushController } from './push.controller';
import { PushService } from './push.service';
import { NotificationTaskService } from './notificaciones.service';
import { SubscriptionService } from './subscription.service';

@Module({
  controllers: [PushController],
  providers: [PushService, NotificationTaskService, SubscriptionService],
})
export class PushModule {}
