import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsService } from './notificaciones.service';
import { NotificationsController } from './notificaciones.controller';
import { FirebaseModule } from '../firebase/firebase.module'; 
import { Token, TokenSchema } from './token.schema'; 
import { SchedulingService } from './scheduling.service'; 
@Module({
  imports: [
    FirebaseModule, 
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService, 
    SchedulingService 
  ],
  exports: [NotificationsService], 
})
export class NotificationsModule {}