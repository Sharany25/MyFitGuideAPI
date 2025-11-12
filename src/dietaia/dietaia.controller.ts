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
  // Note: No necesitamos importar UseGuards, pero es la práctica recomendada para el nuevo endpoint.
} from '@nestjs/common';
import { DietaiaService } from './dietaia.service';
import { CreateDietaiaDto } from './dto/create-dietaia.dto';
import { UpdateDietaiaDto } from './dto/update-dietaia.dto';

@Controller('dieta-ia')
export class DietaiaController {
  constructor(private readonly dietaiaService: DietaiaService) {}

  /**
   * Endpoint: POST /dieta-ia
   * Crea una nueva dieta.
   * Se elimina el try/catch, permitiendo la propagación de excepciones del servicio.
   */
  @Post()
  async create(@Body() createDietaiaDto: CreateDietaiaDto) {
    // Si el servicio lanza una excepción (ej: BadRequestException), NestJS la maneja automáticamente.
    return await this.dietaiaService.create(createDietaiaDto);
  }

  // --- NUEVO MÉTODO: OBTENER TODAS LAS DIETAS ---
  /**
   * Endpoint: GET /dieta-ia
   * Retorna todas las dietas en la BD. 
   * IMPORTANTE: En producción, este endpoint debe usar un @UseGuards() 
   * para restringir el acceso solo a administradores.
   */
  // La ruta base @Get() debe ir ANTES que @Get(':param')
  @Get()
  async findAll() {
    return this.dietaiaService.findAll();
  }
  // ----------------------------------------------


  /**
   * Endpoint: GET /dieta-ia/:userId
   * Obtiene la dieta más reciente de un usuario.
   */
  @Get(':userId')
  async obtenerDietaPorUsuario(@Param('userId') userId: string) {
    const dieta = await this.dietaiaService.getDietaSemanaPorUsuario(userId);
    // Nota: El servicio ya lanza NotFoundException, pero lo dejamos aquí por consistencia.
    if (!dieta) {
      throw new NotFoundException(
        `No se encontró dieta para el usuario con ID: ${userId}`,
      );
    }
    return dieta;
  }

  /**
   * Endpoint: PATCH /dieta-ia/:userId
   * Actualiza los datos generales de la dieta.
   */
  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateDietaiaDto: UpdateDietaiaDto,
  ) {
    // Si el servicio falla (ej: NotFoundException), lo manejará el filtro.
    // Si queremos un manejo de error específico para DB/Mongoose, mantenemos el try/catch.
    try {
      const updatedDieta = await this.dietaiaService.update(userId, updateDietaiaDto);
      if (!updatedDieta) {
        throw new NotFoundException(`No se encontró dieta para actualizar con ID: ${userId}`);
      }
      return updatedDieta;
    } catch (error) {
      // Re-lanzar las excepciones de forma genérica para errores no esperados (DB, Mongoose).
      throw new HttpException(
        { message: 'Error al actualizar la dieta IA', error: error?.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Endpoint: PATCH /dieta-ia/:userId/platillo
   * Modifica un platillo específico usando la IA.
   */
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

    // Aquí mantenemos el try/catch para capturar y estandarizar los errores de OpenAI/Parseo
    // que vienen del servicio como BadRequestException, y errores de Mongoose.
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