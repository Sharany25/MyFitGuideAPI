import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PruebaRutinaService } from './prueba-rutina.service';
import { CreatePruebaRutinaDto } from './dto/create-prueba-rutina.dto';
import { UpdatePruebaRutinaDto } from './dto/update-prueba-rutina.dto';

@Controller('prueba-rutina')
export class PruebaRutinaController {
  constructor(private readonly rutinaService: PruebaRutinaService) {}

  @Post()
  create(@Body() dto: CreatePruebaRutinaDto) {
    return this.rutinaService.create(dto);
  }

  @Get()
  findAll() {
    return this.rutinaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const rutina = await this.rutinaService.findOne(id);
    if (!rutina) throw new NotFoundException(`Rutina con ID ${id} no encontrada`);
    return rutina;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePruebaRutinaDto) {
    const rutina = await this.rutinaService.update(id, dto);
    if (!rutina) throw new NotFoundException(`Rutina con ID ${id} no encontrada`);
    return rutina;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.rutinaService.remove(id);
    if (!deleted) throw new NotFoundException(`Rutina con ID ${id} no encontrada`);
    return deleted;
  }
}
