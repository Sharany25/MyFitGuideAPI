// src/prueba-dieta/prueba-dieta.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePruebaDietaDto } from './dto/create-prueba-dieta.dto';
import { PruebaDietaService } from './prueba-dieta.service';

@Controller('prueba-dieta')
export class PruebaDietaController {
  constructor(private readonly dietaService: PruebaDietaService) {}

  @Post()
  async create(@Body() dto: CreatePruebaDietaDto) {
    return this.dietaService.create(dto);
  }
}
