import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Admin, AdminDocument } from './schemas/admin.schema';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcryptjs';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly configService: ConfigService,
  ) {}

  async create(adminDto: CreateAdminDto) {
    const exists = await this.adminModel.findOne({ correo: adminDto.correo.trim().toLowerCase() });
    if (exists) throw new BadRequestException('El correo ya está registrado');

    const rawToken = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedToken = await bcrypt.hash(rawToken, 10);
    const hashedPassword = await bcrypt.hash(adminDto.contrasena, 10);

    const createdAdmin = new this.adminModel({
      correo: adminDto.correo.trim().toLowerCase(),
      contrasena: hashedPassword,
      foto: adminDto.foto,
      rol: adminDto.rol,
      verificationToken: hashedToken,
      isVerified: false,
    });

    await createdAdmin.save();
    await this.sendVerificationEmail(createdAdmin.correo, rawToken);

    return { 
      id: createdAdmin._id,
      correo: createdAdmin.correo,
      foto: createdAdmin.foto,
      rol: createdAdmin.rol,
      isVerified: createdAdmin.isVerified
    };
  }

  async sendVerificationEmail(email: string, token: string) {
    // 🔍 LOG: Verifica si las variables de entorno están bien cargadas
    const emailUser = this.configService.get('EMAIL_USER');
    const emailPass = this.configService.get('EMAIL_PASSWORD');

    console.log('EMAIL_USER:', emailUser);
    console.log('EMAIL_PASSWORD:', emailPass ? '[OK]' : '[NOT SET]');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const logoUrl = 'https://i.imgur.com/QhMLrZZ.jpeg';
    const html = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #23282d; padding: 0; margin: 0;">
        <div style="max-width: 420px; margin: 36px auto 0 auto; background: #23282d; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 24px rgba(44,62,80,0.08);">
          <div style="background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%); padding: 36px 18px 18px 18px; text-align: center;">
            <img src="${logoUrl}" alt="MyFitGuide" style="max-height: 75px; border-radius: 12px; margin-bottom: 12px;" />
            <h2 style="color: #fff; font-size: 26px; font-weight: 600; margin: 0;">Soporte MyFitGuide</h2>
          </div>
          <div style="padding: 28px 30px 22px 30px; background: #23282d;">
            <p style="color: #9ff7cd; font-size: 17px; font-weight: 500; margin-top: 0; margin-bottom: 10px;">¡Has sido invitado como administrador!</p>
            <p style="color: #f1f1f1; font-size: 15px; margin: 0 0 24px 0;">
              Usa el siguiente código para activar tu cuenta de administrador:
            </p>
            <div style="background: #0f1a1f; border-radius: 9px; padding: 23px 0; margin-bottom: 26px; margin-top: 10px; text-align: center;">
              <span style="display: inline-block; color: #61ffb1; font-size: 29px; letter-spacing: 4px; font-weight: 700; font-family: 'Roboto Mono', monospace;">
                ${token}
              </span>
            </div>
            <p style="color: #b0b7c3; font-size: 13px; margin-bottom: 0;">
              Si tú no solicitaste esta cuenta, puedes ignorar este mensaje.<br>
              &mdash; Equipo MyFitGuide
            </p>
          </div>
        </div>
      </div>
    `;

    try {
      const info = await transporter.sendMail({
        from: `"Soporte MyFitGuide" <${emailUser}>`,
        to: email,
        subject: 'Tu código de activación de administrador | MyFitGuide',
        html,
      });

      console.log('Correo enviado con éxito:', info.messageId);
    } catch (error) {
      console.error('Error al enviar correo:', error);
    }
  }

  async verifyToken(correo: string, token: string): Promise<boolean> {
    if (!correo || !token) return false;
    const correoTrim = typeof correo === "string" ? correo.trim().toLowerCase() : "";
    if (!correoTrim) return false;

    const admin = await this.adminModel.findOne({ correo: correoTrim });
    if (!admin || !admin.verificationToken) {
      return false;
    }
    const isMatch = await bcrypt.compare(token, admin.verificationToken);
    if (!isMatch) return false;

    admin.isVerified = true;
    admin.verificationToken = undefined;
    await admin.save();
    return true;
  }

  async login(correo: string, contrasena: string) {
    if (!correo || !contrasena) {
      return { message: "Correo o contraseña incorrectos", status: 401 };
    }
    const correoTrim = typeof correo === "string" ? correo.trim().toLowerCase() : "";
    const admin = await this.adminModel.findOne({ correo: correoTrim });
    if (!admin) {
      return { message: "Correo o contraseña incorrectos", status: 401 };
    }
    const match = await bcrypt.compare(contrasena, admin.contrasena);
    if (!match) {
      return { message: "Correo o contraseña incorrectos", status: 401 };
    }
    return {
      admin: {
        id: admin._id,
        correo: admin.correo,
        foto: admin.foto,
        rol: admin.rol,
        isVerified: admin.isVerified
      },
      status: 200
    };
  }

  async findAll() {
    const admins = await this.adminModel.find().select('-contrasena -verificationToken');
    return admins;
  }

  async findOne(id: string) {
    const admin = await this.adminModel.findById(id).select('-contrasena -verificationToken');
    return admin;
  }

  async update(id: string, adminDto: Partial<CreateAdminDto>) {
    if (adminDto.contrasena) {
      adminDto.contrasena = await bcrypt.hash(adminDto.contrasena, 10);
    }
    const admin = await this.adminModel.findByIdAndUpdate(id, adminDto, { new: true }).select('-contrasena -verificationToken');
    if (!admin) throw new BadRequestException('No existe el admin');
    return admin;
  }

  async remove(id: string) {
    const res = await this.adminModel.findByIdAndDelete(id);
    if (!res) throw new BadRequestException('No existe el admin');
    return { deleted: true };
  }
}
