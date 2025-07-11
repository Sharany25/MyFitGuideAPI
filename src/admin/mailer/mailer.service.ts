import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  constructor(private configService: ConfigService) {}

  async sendActivationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });

    const logoUrl = 'https://i.imgur.com/QhMLrZZ.jpeg'; 
    const link = `${this.configService.get('ACTIVATION_URL')}?token=${token}`;

    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f3; padding: 20px;">
        <div style="max-width: 620px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%); padding: 30px 20px; text-align: center;">
            <img src="${logoUrl}" alt="MyFitGuide" style="max-height: 90px; margin-bottom: 10px;" />
            <h1 style="colo r: #ffffff; margin: 0; font-size: 24px;">Activa tu cuenta</h1>
          </div>
          <div style="padding: 30px 25px;">
            <h2 style="color: #2e7d32; margin-bottom: 10px;">¡Has sido invitado como administrador!</h2>
            <p style="color: #555555; font-size: 16px; line-height: 1.6;">
            Te hemos registrado como administrador en <strong>MyFitGuide</strong>. Para comenzar a gestionar la plataforma, por favor activa tu cuenta haciendo clic en el botón a continuación:
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${link}" style="background: linear-gradient(135deg, #66bb6a 0%, #388e3c 100%); color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: bold;">
                Activar cuenta
              </a>
            </div>
            <p style="font-size: 14px; color: #999999;">
              Si tú no solicitaste esta cuenta, ignora este mensaje.
            </p>
          </div>
          <div style="background-color: #e8f5e9; text-align: center; padding: 18px; font-size: 13px; color: #789262;">
            © ${new Date().getFullYear()} MyFitGuide. Todos los derechos reservados.
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Soporte MyFitGuide" <${this.configService.get('EMAIL_USER')}>`,
      to: email,
      subject: 'Activa tu cuenta',
      html,
    });
  }
}
