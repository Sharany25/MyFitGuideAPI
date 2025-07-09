import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { RutinasIAService } from './rutinaia.service';
import { CrearRutinaDto } from './dto/create-rutinaia.dto';

@Controller('rutinas-ia')
export class RutinasIAController {
  constructor(private readonly rutinasIAService: RutinasIAService) {}

  @Post()
  async crear(@Body() crearRutinaDto: CrearRutinaDto) {
    return this.rutinasIAService.generarRutina(crearRutinaDto);
  }

  @Get(':userId')
  async obtenerRutinaPorUsuario(@Param('userId') userId: string) {
    const rutina = await this.rutinasIAService.obtenerRutinaPorUserId(userId);
    if (!rutina) {
      throw new NotFoundException(`No se encontró rutina para el usuario con ID: ${userId}`);
    }
    return rutina;
  }
}
