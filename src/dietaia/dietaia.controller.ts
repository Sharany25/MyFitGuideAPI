import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
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
      throw new NotFoundException(
        `No se encontró dieta para el usuario con ID: ${userId}`,
      );
    }
    return dieta;
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateDietaiaDto: UpdateDietaiaDto,
  ) {
    try {
      const updatedDieta = await this.dietaiaService.update(userId, updateDietaiaDto);
      if (!updatedDieta) {
        throw new NotFoundException(`No se encontró dieta para actualizar con ID: ${userId}`);
      }
      return updatedDieta;
    } catch (error) {
      throw new HttpException(
        { message: 'Error al actualizar la dieta IA', error: error?.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':userId/platillo')
  async modificarPlatillo(
    @Param('userId') userId: string,
    @Body() body: { dia: string; tipoComida: string; platillo: string },
  ) {
    const { dia, tipoComida, platillo } = body;

    if (!dia || !tipoComida || !platillo) {
      throw new HttpException(
        { message: 'Los campos "dia", "tipoComida" y "platillo" son obligatorios' },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const resultado = await this.dietaiaService.modificarPlatilloConIA(
        userId,
        dia,
        tipoComida,
        platillo,
      );
      return resultado;
    } catch (error) {
      throw new HttpException(
        { message: 'Error al modificar el platillo', error: error?.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
