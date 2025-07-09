import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { LoginDto } from './dto/create-login.dto';
import { Usuarios } from 'src/usuarios/schemas/usuario.schema';

@Injectable()
export class LoginService {
  constructor(
    private readonly usuariosService: UsuariosService,
  ) {}

  async login(loginDto: LoginDto) {
    const { correoElectronico, contraseña } = loginDto;

    const usuario: Usuarios | null = await this.usuariosService.validateUser(correoElectronico, contraseña);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return usuario;
  }
}
