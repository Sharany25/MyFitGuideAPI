import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DietaiaService } from './dietaia.service';
import { CreateDietaiaDto } from './dto/create-dietaia.dto';
import { UpdateDietaiaDto } from './dto/update-dietaia.dto';

@Controller('dieta-ia')
export class DietaiaController {
  constructor(private readonly dietaiaService: DietaiaService) {}

@Post()
async create(@Body() createDietaiaDto: CreateDietaiaDto) {
  try {
    return await this.dietaiaService.create(createDietaiaDto);
  } catch (error) {
    throw new HttpException(
      { message: 'Error al crear la dieta IA', error: error?.message },
      HttpStatus.BAD_REQUEST,
    );
  }
}

@Get(':userId')
async obtenerDietaPorUsuario(@Param('userId') userId: string) {
  const dieta = await this.dietaiaService.getDietaSemanaPorUsuario(userId);
  if (!dieta) {
    throw new NotFoundException(`No se encontró dieta para el usuario con ID: ${userId}`);
  }
  return dieta;
}
}