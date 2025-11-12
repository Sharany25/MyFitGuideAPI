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
import { DietaiaService, DietaListado } from './dietaia.service'; // Importamos DietaListado
import { CreateDietaiaDto } from './dto/create-dietaia.dto';
import { UpdateDietaiaDto } from './dto/update-dietaia.dto';
import { Dietaia } from './schemas/dietaia.schemas'; // Importamos Dietaia para el tipo completo

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
  
  // --- ENDPOINT: GET /dieta-ia/:userId (VERSIÓN LIGERA - FIX CRASH) ---
  /**
   * Endpoint: GET /dieta-ia/:userId
   * Obtiene la dieta más reciente de un usuario, EXCLUYENDO el JSON de 'resultado' (para evitar el crash).
   * La aplicación cliente debe llamar a este endpoint en pantallas de resumen.
   */
  @Get(':userId')
  async obtenerDietaLigeraPorUsuario(@Param('userId') userId: string): Promise<DietaListado> {
    const dieta = await this.dietaiaService.getDietaSemanaPorUsuario(userId);
    if (!dieta) {
      throw new NotFoundException(
        `No se encontró dieta ligera para el usuario con ID: ${userId}`,
      );
    }
    return dieta;
  }
  // -------------------------------------------------------------------

  // --- ENDPOINT: GET /dieta-ia/:userId/detalle (VERSIÓN COMPLETA) ---
  /**
   * Endpoint: GET /dieta-ia/:userId/detalle
   * Obtiene la dieta COMPLETA, incluyendo el JSON grande de 'resultado'.
   * Solo debe ser llamado cuando el cliente va a renderizar la tabla de comidas.
   */
  @Get(':userId/detalle')
  async obtenerDietaCompletaPorUsuario(@Param('userId') userId: string): Promise<Dietaia> {
    const dieta = await this.dietaiaService.getDietaCompleta(userId);
    if (!dieta) {
      throw new NotFoundException(
        `No se encontró dieta completa para el usuario con ID: ${userId}`,
      );
    }
    return dieta;
  }
  // -------------------------------------------------------------------

  /**
   * Endpoint: PATCH /dieta-ia/:userId
   * Actualiza los datos generales de la dieta.
   */
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