import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DietaAI } from './schema/dieta-ai.schema';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;
  private readonly logger = new Logger(OpenaiService.name);

  constructor(
    private configService: ConfigService,
    @InjectModel(DietaAI.name) private readonly dietaModel: Model<DietaAI>,
  ) {
    this.openai = new OpenAI({ apiKey: this.configService.get('OPENAI_API_KEY') });
  }

  async generarDieta(datos: any): Promise<any> {
    if (!datos) {
      throw new Error('Faltan datos para generar la dieta');
    }

    const { genero, altura, peso, objetivo, alergias, presupuesto } = datos;

    if (!genero || !altura || !peso || !objetivo || !presupuesto) {
      throw new Error('Faltan datos necesarios para generar la dieta');
    }

    // Prompt para OpenAI 
    const prompt = `
      Quiero que generes una dieta semanal personalizada basada en los siguientes datos del usuario:

      - Género: ${genero}
      - Altura: ${altura} cm
      - Peso: ${peso} kg
      - Objetivo: ${objetivo}
      - Alergias: ${alergias?.join(', ') || 'ninguna'}
      - Presupuesto semanal máximo: $${presupuesto}

      Por favor, genera una dieta de lunes a domingo con desayuno, comida y cena por día.
      Asegúrate de que cada día no supere el presupuesto diario.
    `;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      const resultado = completion.choices[0].message.content;

      const nuevaDieta = new this.dietaModel({
        genero,
        altura,
        peso,
        objetivo,
        alergias,
        presupuesto,
        resultado,
      });

      await nuevaDieta.save();

      return { mensaje: 'Dieta generada exitosamente', resultado };
    } catch (error) {
      this.logger.error('Error llamando a OpenAI:', error);
      throw new Error('Error al obtener la respuesta de OpenAI');
    }
  }
}