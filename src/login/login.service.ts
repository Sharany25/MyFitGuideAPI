import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-login.dto';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/schemas/admin.schema';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: AdminService) {}

  async login(loginDto: LoginDto) {
    const { correoElectronico, contraseña } = loginDto;

    const usuario: Admin | null = await this.usersService.validateAdmin(
      correoElectronico,
      contraseña,
    );

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return {
      message: 'Login exitoso',
      usuario: {
        email: usuario.email,
        role: usuario.role,
        isActive: usuario.isActive,
      },
    };
  }
}
