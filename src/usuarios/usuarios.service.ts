import { Injectable, NotFoundException, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuarios } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import { addHours } from 'date-fns';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger(UsuariosService.name);

  constructor(
    @InjectModel(Usuarios.name) private usuariosModel: Model<Usuarios>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuarios> {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, 10);
    const createdUsuario = new this.usuariosModel({
      ...createUsuarioDto,
      contraseña: hashedPassword,
    });
    return createdUsuario.save();
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuarios> {
    if (updateUsuarioDto.contraseña) {
      updateUsuarioDto.contraseña = await bcrypt.hash(updateUsuarioDto.contraseña, 10);
    }
    const updatedUsuario = await this.usuariosModel.findByIdAndUpdate(
      id,
      updateUsuarioDto,
      { new: true }
    ).exec();

    if (!updatedUsuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return updatedUsuario;
  }

  async findOne(id: string): Promise<Usuarios> {
    const usuario = await this.usuariosModel.findById(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async findAll(): Promise<Usuarios[]> {
    return this.usuariosModel.find().exec();
  }

  async remove(id: string): Promise<{ message: string }> {
    const removedUsuario = await this.usuariosModel.findByIdAndDelete(id).exec();
    if (!removedUsuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return { message: 'Usuario eliminado exitosamente' };
  }

  async validateUser(correoElectronico: string, contraseña: string): Promise<Usuarios | null> {
    const usuario = await this.usuariosModel.findOne({ correoElectronico }).lean().exec();
    if (usuario && await bcrypt.compare(contraseña, usuario.contraseña)) {
      return usuario;
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    const { correoElectronico } = forgotPasswordDto;
    const user = await this.usuariosModel.findOne({ correoElectronico }).exec();

    if (!user) {
      this.logger.warn(`Intento de recuperación de contraseña para correo no existente: ${correoElectronico}`);
      return { message: 'Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña.' };
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const resetTokenExpires = addHours(new Date(), 1); // Token válido por 1 hora

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    await this.enviarCorreoRestablecimiento(user.correoElectronico, resetToken);

    return { message: 'Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña.' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { token, newPassword } = resetPasswordDto;

    const user = await this.usuariosModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    }).exec();

    if (!user) {
      throw new UnauthorizedException('El token de restablecimiento de contraseña es inválido o ha expirado.');
    }

    // Hashear la nueva contraseña
    user.contraseña = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return { message: 'Tu contraseña ha sido restablecida exitosamente.' };
  }


  private async enviarCorreoRestablecimiento(to: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const imgPath = path.join(process.cwd(), 'assets', 'Email.jpg'); 

    const htmlContent = `
      <div style="max-width:450px;margin:0 auto;background:#23272b;border-radius:20px;overflow:hidden;box-shadow:0 6px 24px #0002;">
        <div style="background:linear-gradient(135deg,#23c6d8,#4ad991);padding:36px 0 18px 0;text-align:center;">
          <img src="cid:logoimg" alt="Logo" width="90" style="border-radius:16px;border:3px solid #fff;margin-bottom:14px;" />
          <h2 style="color:#fff;font-size:2rem;font-weight:600;margin:0;">MyFitGuide - Recuperación de Contraseña</h2>
        </div>
        <div style="background:#23272b;padding:32px 24px 24px 24px;color:#fff;">
          <h3 style="color:#4ad991;margin-top:0;">Solicitud de Restablecimiento de Contraseña</h3>
          <p style="color:#fff;font-size:1rem;margin-bottom:22px;">
            Has solicitado restablecer tu contraseña. Utiliza el siguiente token en la aplicación para proceder:
          </p>
          <div style="background:#222c22;padding:18px;border-radius:8px;margin-bottom:18px;border-left:6px solid #4ad991; text-align: center;">
            <p style="color:#ffffff; font-size: 1.2rem; font-weight: bold; word-break: break-all;">
              ${token}
            </p>
          </div>
          <p style="color:#bdbdbd;font-size:0.95rem;margin-top:32px;">
            Si no solicitaste este cambio, por favor ignora este correo.
            <br>
            Este token expirará en 1 hora.
            <br>
            — Equipo MyFitGuide
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"MyFitGuide" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: 'MyFitGuide - Token de Restablecimiento de Contraseña',
      html: htmlContent,
      attachments: [{
        filename: 'Email.jpg',
        path: imgPath,
        cid: 'logoimg'
      }]
    };

    try {
      await transporter.sendMail(mailOptions);
      this.logger.log(`Correo de restablecimiento enviado a ${to}`);
    } catch (error) {
      this.logger.error(`Error al enviar el correo de restablecimiento a ${to}:`, error.message, error.stack);
      throw new BadRequestException('No se pudo enviar el correo de restablecimiento. Inténtalo de nuevo más tarde.');
    }
  }
}
