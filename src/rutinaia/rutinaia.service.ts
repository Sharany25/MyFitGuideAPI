import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rutina, RutinaDocument } from './schema/rutina.schema';
import { Model } from 'mongoose';
import { CrearRutinaDto } from './dto/create-rutinaia.dto';
import OpenAI from 'openai';

@Injectable()
export class RutinasIAService {
  private openai: OpenAI;
  private readonly logger = new Logger(RutinasIAService.name);

  constructor(
    @InjectModel(Rutina.name) private rutinaModelo: Model<RutinaDocument>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generarRutina(crearRutinaDto: CrearRutinaDto): Promise<Rutina> {
    const prompt = this.crearPrompt(crearRutinaDto);

    try {
      const respuesta = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 2200,
      });

      const contenido = respuesta.choices[0].message.content;
      if (!contenido) {
        throw new BadRequestException('No se recibió rutina de OpenAI');
      }

      let rutinaObj: any;
      try {
        rutinaObj = JSON.parse(contenido);

        if (
          !rutinaObj.rutina ||
          !Array.isArray(rutinaObj.rutina) ||
          rutinaObj.rutina.length !== crearRutinaDto.dias
        ) {
          throw new Error('La estructura JSON no cumple el formato esperado.');
        }

        for (const dia of rutinaObj.rutina) {
          if (!dia.ejercicios || dia.ejercicios.length < 4) {
            throw new Error('Algún día tiene menos de 4 ejercicios.');
          }
        }
      } catch (e) {
        this.logger.error('Error parseando la rutina generada', e);
        throw new BadRequestException(
          'La respuesta de OpenAI no tiene el formato esperado.',
        );
      }

      const nuevaRutina = new this.rutinaModelo({
        ...crearRutinaDto,
        rutina: rutinaObj,
      });

      return await nuevaRutina.save();
    } catch (error) {
      this.logger.error(
        'Error al generar rutina con OpenAI:',
        error?.message || error,
      );
      throw new BadRequestException('Error al generar la rutina.');
    }
  }

  private crearPrompt(datos: CrearRutinaDto): string {
    return `
Eres un entrenador personal profesional y debes crear una rutina de ${datos.dias} días, con las siguientes condiciones:

- Nombre: ${datos.nombre}
- Edad: ${datos.edad}
- Objetivo: ${datos.objetivo}
- Lugar de entrenamiento: ${datos.preferencias.join(', ')}
- Días de entrenamiento: ${datos.dias}
${datos.lesiones ? `- Lesiones o limitaciones: ${datos.lesiones}` : ''}

REGLAS:
- Cada día tiene un grupo muscular diferente o enfoque.
- Mínimo 4 ejercicios por día (5 si es fullbody).
- Ejercicios no repetidos dentro del mismo día.
- Cada ejercicio incluye:
  - nombre
  - series (ej: 4)
  - repeticiones (ej: 12)
  - descanso (ej: "90s")
  - propósito

- Retorna SOLO este JSON:

{
  "objetivo_rutina": "Texto",
  "rutina": [
    {
      "dia": "Día 1",
      "grupo": "Grupo muscular",
      "ejercicios": [
        {
          "nombre": "Ejercicio",
          "series": 4,
          "repeticiones": 12,
          "descanso": "90s",
          "propósito": "Objetivo"
        }
      ]
    }
  ]
}
    `.trim();
  }

  // ✅ Método para GET /rutinas-ia/:userId
  async obtenerRutinaPorUserId(
    userId: string,
  ): Promise<{ userId: string; rutina: any; creado: Date }> {
    const rutina = await this.rutinaModelo
      .findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!rutina || !rutina.rutina) {
      throw new NotFoundException(
        `No existe rutina para el usuario con ID ${userId}`,
      );
    }

    return {
      userId: rutina.userId,
      rutina: rutina.rutina,
      creado: rutina.createdAt as Date};
  }
}
