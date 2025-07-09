import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsuarioCompletoService } from './usuario-completo.service';

@Controller('usuario-completo')
export class UsuarioCompletoController {
  constructor(private readonly usuarioCompletoService: UsuarioCompletoService) {}

  @Get(':userId')
  async getUsuarioCompleto(@Param('userId') userId: string) {
    const data = await this.usuarioCompletoService.obtenerUsuarioCompleto(userId);
    if (!data) throw new NotFoundException('No se pudo encontrar el usuario completo');
    return data;
  }
}
