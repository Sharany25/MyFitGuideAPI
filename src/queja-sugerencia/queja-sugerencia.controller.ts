import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuejaSugerenciaService } from './queja-sugerencia.service';
import { CreateQuejaSugerenciaDto } from './dto/create-queja-sugerencia.dto';
import { UpdateQuejaSugerenciaDto } from './dto/update-queja-sugerencia.dto';

@Controller('queja-sugerencia')
export class QuejaSugerenciaController {
  constructor(private readonly quejaSugerenciaService: QuejaSugerenciaService) {}

  @Post()
  create(@Body() createQuejaSugerenciaDto: CreateQuejaSugerenciaDto) {
    return this.quejaSugerenciaService.create(createQuejaSugerenciaDto);
  }

  @Get()
  findAll() {
    return this.quejaSugerenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quejaSugerenciaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuejaSugerenciaDto: UpdateQuejaSugerenciaDto) {
    return this.quejaSugerenciaService.update(id, updateQuejaSugerenciaDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quejaSugerenciaService.remove(id);
  }
}
