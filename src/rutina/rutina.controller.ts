import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { CreateRutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';

@Controller('rutina')
export class RutinaController {
  constructor(private readonly rutinaService: RutinaService) {}

  @Post()
  create(@Body() createRutinaDto: CreateRutinaDto) {
    return this.rutinaService.create(createRutinaDto);
  }

  @Get()
  findAll() {
    return this.rutinaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rutinaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRutinaDto: UpdateRutinaDto) {
    return this.rutinaService.update(+id, updateRutinaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rutinaService.remove(+id);
  }
}
