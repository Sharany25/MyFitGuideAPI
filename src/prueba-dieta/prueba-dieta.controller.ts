import { Body, Controller, Post, Get, Param, NotFoundException } from '@nestjs/common';
import { CreatePruebaDietaDto } from './dto/create-prueba-dieta.dto';
import { PruebaDietaService } from './prueba-dieta.service';

@Controller('prueba-dieta')
export class PruebaDietaController {
  constructor(private readonly dietaService: PruebaDietaService) {}

  @Post()
  async create(@Body() dto: CreatePruebaDietaDto) {
    return this.dietaService.create(dto);
  }

  // Nuevo: endpoint para obtener la dieta por userId
  @Get('usuario/:userId')
  async getByUserId(@Param('userId') userId: string) {
    const dieta = await this.dietaService.findByUserId(Number(userId));
    if (!dieta) throw new NotFoundException('No se encontró dieta para este usuario');
    return dieta;
  }
}
