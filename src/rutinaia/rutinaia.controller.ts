// src/rutinasIA/rutinasIA.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RutinasIAService } from './rutinaia.service';
import { CrearRutinaDto } from './dto/create-rutinaia.dto';
import { Rutina } from './schema/rutina.schema';


@Controller('rutinas-ia')
export class RutinasIAController {
  constructor(private readonly rutinasIAService: RutinasIAService) {}

  @Post()
  async crear(@Body() crearRutinaDto: CrearRutinaDto): Promise<Rutina> {
    return this.rutinasIAService.generarRutina(crearRutinaDto);
  }
}
