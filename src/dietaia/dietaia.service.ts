import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dietaia, DietaiaDocument } from './schemas/dietaia.schemas';
import { CreateDietaiaDto } from './dto/create-dietaia.dto';

@Injectable()
export class DietaiaService {
  private openai: OpenAI;
  private readonly logger = new Logger(DietaiaService.name);

  constructor(
    private configService: ConfigService,
    @InjectModel(Dietaia.name)
    private readonly dietaiaModel: Model<DietaiaDocument>,
  ) {
    this.openai = new OpenAI({ apiKey: this.configService.get('OPENAI_API_KEY') });
  }

  async create(createDietaiaDto: CreateDietaiaDto): Promise<{ mensaje: string; resultado: any }> {
    const { genero, altura, peso, objetivo, alergias, presupuesto } = createDietaiaDto;

    if (!genero || !altura || !peso || !objetivo || !presupuesto) {
      throw new BadRequestException('Faltan datos necesarios para generar la dieta');
    }

    const prompt = `
      Eres un nutricionista profesional. Genera una dieta semanal detallada para un usuario:
      - Género: ${genero}
      - Altura: ${altura} cm
      - Peso: ${peso} kg
      - Objetivo: ${objetivo}
      - Alergias: ${alergias?.join(', ') || 'ninguna'}
      - Presupuesto semanal máximo: $${presupuesto} MXN

      La dieta debe tener los días: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado y Domingo.
      Para cada día, incluye desayuno, comida y cena con: platillo, ingredientes (nombre y cantidad), calorías, macros (proteínas, carbohidratos, grasas), costo.
      Al final de cada día: totales de calorías, proteínas, carbohidratos, grasas y costo.
      Al final de la semana: totales semanales de calorías, proteínas, carbohidratos, grasas y costo total (no excedas el presupuesto).

      Devuelve solo el siguiente JSON exacto y con los 7 días:
      {
        "semana": [
          { "dia": "Lunes", "comidas": [...], "totales_dia": {...} },
          { "dia": "Martes", "comidas": [...], "totales_dia": {...} },
          { "dia": "Miércoles", "comidas": [...], "totales_dia": {...} },
          { "dia": "Jueves", "comidas": [...], "totales_dia": {...} },
          { "dia": "Viernes", "comidas": [...], "totales_dia": {...} },
          { "dia": "Sábado", "comidas": [...], "totales_dia": {...} },
          { "dia": "Domingo", "comidas": [...], "totales_dia": {...} }
        ],
        "totales_semana": {
          "costo_total": 0,
          "calorias_total": 0,
          "proteinas_total": 0,
          "carbohidratos_total": 0,
          "grasas_total": 0
        }
      }
      Excluye ingredientes a los que es alérgico el usuario, usa alimentos comunes en México y no repitas platillos más de dos veces por semana.
    `;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 4096,
      });

      const resultado = completion.choices[0].message.content;
      if (!resultado) throw new BadRequestException('No se recibió respuesta válida de OpenAI');

      let resultadoJSON: any;
      try {
        resultadoJSON = JSON.parse(resultado);
      } catch {
        resultadoJSON = resultado;
      }

      const nuevaDieta = new this.dietaiaModel({
        ...createDietaiaDto,
        resultado: resultadoJSON,
      });

      await nuevaDieta.save();

      if (resultadoJSON.semana && resultadoJSON.semana.length < 7) {
        this.logger.warn(`La respuesta de OpenAI contiene menos de 7 días. Revisa el prompt o el modelo.`);
      }

      return { mensaje: 'Dieta generada exitosamente', resultado: resultadoJSON };
    } catch (error) {
      this.logger.error('Error llamando a OpenAI:', error);
      throw new BadRequestException('Error al obtener la respuesta de OpenAI');
    }
  }

    async getDietaSemanaPorUsuario(userId: string): Promise<{ userId: string; resultado: any; creado: Date | undefined }> {
      const dieta = await this.dietaiaModel.findOne({ userId }).sort({ createdAt: -1 }).lean();
      if (!dieta || !dieta.resultado) {
        throw new NotFoundException('No existe una dieta detallada para este usuario');
      }
      return {
        userId: dieta.userId,
        resultado: dieta.resultado,
        creado: dieta.createdAt, // puede ser undefined, ahora permitido
      };
    }
}
