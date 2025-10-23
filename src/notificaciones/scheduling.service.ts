
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule'; 
import { NotificationsService } from './notificaciones.service';

@Injectable()
export class SchedulingService {
  
  constructor(private readonly notificationsService: NotificationsService) {}


  @Cron('0 9 * * 1') 
  async sendDailyInfoNotification() {

    const title = 'Domina tu Fitness con MyFitGuide!';
    const body = 'Aprende a usar todas las funcionalidades de MyFitGuide para alcanzar tus objetivos.';

        const data = {
            click_action: 'https://myfitguideapp-f48a8.web.app/projects/myfitguide', 
            image: 'https://i.imgur.com/wxoocAI.png' 
        };
    try {
      await this.notificationsService.sendNotificationToAllSubscribers(title, body, data);
      console.log('Notificación diaria programada enviada con éxito.');

    } catch (error) {
      console.error('Error al ejecutar la tarea programada de notificaciones:', error);
    }
  }
}