import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanificacionService } from './planificacion.service';
import { CreatePlanificacionDto } from './dto/create-planificacion.dto';
import { UpdatePlanificacionDto } from './dto/update-planificacion.dto';

@Controller('planificacion')
export class PlanificacionController {
  constructor(private readonly planificacionService: PlanificacionService) {}

  @Post()
  create(@Body() createPlanificacionDto: CreatePlanificacionDto) {
    return this.planificacionService.create(createPlanificacionDto);
  }

  @Get()
  findAll() {
    return this.planificacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planificacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanificacionDto: UpdatePlanificacionDto) {
    return this.planificacionService.update(+id, updatePlanificacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planificacionService.remove(+id);
  }
}
