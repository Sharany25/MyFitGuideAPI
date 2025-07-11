import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import * as bcrypt from 'bcrypt';
import { MailerService } from './mailer/mailer.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private mailerService: MailerService
  ) {}

  async createAdmin(email: string, password: string, role: string = 'Administrador') {
    const hash = await bcrypt.hash(password, 10);
    const token = randomBytes(32).toString('hex');

    const newAdmin = new this.adminModel({
      email,
      password: hash,
      role,
      activationToken: token,
    });

    await newAdmin.save();
    await this.mailerService.sendActivationEmail(email, token);

    return { message: 'Usuario creado. Revisa tu correo para activarlo.' };
  }

  async activateAdmin(token: string) {
    const admin = await this.adminModel.findOne({ activationToken: token });
    if (!admin) return { message: 'Token inválido' };

    admin.isActive = true;
    admin.activationToken = undefined;
    await admin.save();
    return { message: 'Cuenta activada correctamente' };
  }

  async findByEmail(email: string) {
    return this.adminModel.findOne({ email });
  }


  async validateAdmin(email: string, plainPassword: string): Promise<Admin | null> {
    const admin = await this.adminModel.findOne({ email });

    if (!admin) return null;
    if (!admin.isActive) return null;

    const isPasswordValid = await bcrypt.compare(plainPassword, admin.password);
    if (!isPasswordValid) return null;

    return admin;
  }
  async findAll() {
  return this.adminModel.find().select('-password'); // excluye la contraseña
}
async deleteAdmin(id: string) {
  return this.adminModel.findByIdAndDelete(id);
}

}
