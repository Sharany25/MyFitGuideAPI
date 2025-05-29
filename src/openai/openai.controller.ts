import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('dieta')
  async generarDieta(@Body() datos: any) {
    try {
      const resultado = await this.openaiService.generarDieta(datos);
      return resultado;
    } catch (error) {
      throw new HttpException({
        message: 'Hubo un error al generar la dieta.',
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}