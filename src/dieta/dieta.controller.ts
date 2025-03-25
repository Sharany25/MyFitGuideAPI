import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DietaService } from './dieta.service';
import { CreateDietaDto } from './dto/create-dieta.dto';
import { UpdateDietaDto } from './dto/update-dieta.dto';

@Controller('dieta')
export class DietaController {
  constructor(private readonly dietaService: DietaService) {}

  @Post()
  create(@Body() createDietaDto: CreateDietaDto) {
    return this.dietaService.create(createDietaDto);
  }

  @Get()
  findAll() {
    return this.dietaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dietaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDietaDto: UpdateDietaDto) {
    return this.dietaService.update(id, updateDietaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dietaService.remove(id);
  }
}
