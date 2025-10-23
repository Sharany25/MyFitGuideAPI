import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { NotificationsService } from './notificaciones.service';


export interface RegisterTokenDto {
    userId: string; 
    fcmToken: string;
}

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  
  @Post('register-token')
  @HttpCode(HttpStatus.OK)
  async registerToken(@Body() body: RegisterTokenDto) {
    if (!body.userId || !body.fcmToken) {
        return { success: false, message: 'Falta userId o fcmToken.' };
    }
      
    await this.notificationsService.saveToken(body.userId, body.fcmToken);
    
    return { success: true, message: 'Token de registro guardado correctamente.' };
  }
}
/*
  @Post('send-test')
  @HttpCode(HttpStatus.ACCEPTED)
  async sendTestNotification(@Body('userId') userId: string) {
    try {
        await this.notificationsService.sendNotificationToUser(
            userId,
            '¡Prueba de NestJS!',
            'Esta notificación fue enviada por tu API de NestJS a través de Firebase.',
        );
        return { success: true, message: 'Notificación de prueba enviada.' };
    } catch (e) {
        console.error(e);
        return { success: false, message: 'Error al enviar la notificación.' };
    }
  }
}
  */ 