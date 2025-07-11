import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from '../admin.service';

@Injectable()
export class AuthService {
  constructor(private adminService: AdminService, private jwtService: JwtService) {}

  async login(email: string, password: string) {
    const admin = await this.adminService.findByEmail(email);
    if (!admin) throw new UnauthorizedException('Usuario no encontrado');
    if (!admin.isActive) throw new UnauthorizedException('Cuenta no activada');

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = { sub: admin._id, email: admin.email, role: admin.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
