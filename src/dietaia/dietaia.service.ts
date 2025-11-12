import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dietaia, DietaiaDocument } from './schemas/dietaia.schemas';
import { CreateDietaiaDto } from './dto/create-dietaia.dto';
import { UpdateDietaiaDto } from './dto/update-dietaia.dto';

export interface DietaAIGenerada {
  semana: {
    dia: string;
    comidas: any[];
    totales_dia: { [key: string]: number };
  }[];
  totales_semana: { [key: string]: number };
}

// NUEVA INTERFAZ: Representa la Dieta sin el campo resultado (payload grande)
export interface DietaListado extends Omit<Dietaia, 'resultado'> {}


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

  /**
   * Genera y guarda una dieta semanal usando la API de OpenAI.
   */
  async create(createDietaiaDto: CreateDietaiaDto): Promise<{ mensaje: string; resultado: DietaAIGenerada }> {
    const { genero, altura, peso, objetivo, alergias, presupuesto } = createDietaiaDto;

    if (!genero || !altura || !peso || !objetivo || !presupuesto) {
      throw new BadRequestException('Faltan datos necesarios para generar la dieta');
    }

    const prompt = this.buildDietaPrompt(genero, altura, peso, objetivo, alergias, presupuesto);

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o', 
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 4096,
        response_format: { type: 'json_object' }, 
      });

      const jsonString = completion.choices[0].message.content;
      
      if (!jsonString) {
        throw new BadRequestException('No se recibió contenido JSON de OpenAI.');
      }

      const resultadoJSON: DietaAIGenerada = JSON.parse(jsonString);

      const nuevaDieta = new this.dietaiaModel({
        ...createDietaiaDto,
        resultado: resultadoJSON,
        userId: createDietaiaDto.userId,
        createdAt: new Date(),
      });

      await nuevaDieta.save();

      return { mensaje: 'Dieta generada exitosamente', resultado: resultadoJSON };
    } catch (error) {
      this.logger.error('Error durante la generación o persistencia de la dieta:', error);
      
      if (error.status === 400 || error instanceof BadRequestException) {
         throw error;
      }
      
      throw new BadRequestException('Error al obtener o procesar la respuesta de OpenAI. Por favor, inténtelo de nuevo.');
    }
  }

  // --- MÉTODO EXISTENTE MODIFICADO: VERSIÓN LIGERA (SIN JSON GRANDE) ---
  /**
   * Obtiene la dieta más reciente de un usuario, excluyendo el campo 'resultado'.
   * Este es el endpoint de bajo peso para la UI principal (evita el crash).
   */
  async getDietaSemanaPorUsuario(userId: string): Promise<DietaListado> {
    const dieta = await this.dietaiaModel.findOne({ userId })
      .sort({ createdAt: -1 })
      .select('-resultado') // <--- FIX CRÍTICO: Excluir el campo masivo
      .lean() as DietaListado; 
      
    if (!dieta) {
      throw new NotFoundException('No existe una dieta ligera para este usuario');
    }
    
    // El objeto devuelto (DietaListado) es ligero y ya no contiene el JSON masivo.
    return dieta;
  }
  
  // --- NUEVO MÉTODO: OBTENER DIETA COMPLETA (CON JSON GRANDE) ---
  /**
   * Obtiene la dieta más reciente de un usuario, incluyendo el campo 'resultado' COMPLETO.
   * Este endpoint solo debe ser llamado por la pantalla de detalle.
   */
  async getDietaCompleta(userId: string): Promise<Dietaia> {
    const dieta = await this.dietaiaModel.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean() as Dietaia; // Devolver el objeto completo (con resultado)

    if (!dieta || !dieta.resultado) {
      throw new NotFoundException('No existe una dieta completa para este usuario');
    }
    return dieta;
  }
  // --------------------------------------------------------

  // Refactorización: Mover la lógica de prompt a un método privado (SRP)
  private buildDietaPrompt(genero: string, altura: number, peso: number, objetivo: string, alergias?: string[], presupuesto?: number): string {
    const alergiasStr = alergias?.join(', ') || 'ninguna';
    const presupuestoStr = presupuesto ? `$${presupuesto} MXN` : 'sin límite especificado';
    
    return `
Eres un nutricionista profesional. Genera una dieta semanal detallada para un usuario:
- Género: ${genero}
- Altura: ${altura} cm
- Peso: ${peso} kg
- Objetivo: ${objetivo}
- Alergias: ${alergiasStr}
- Presupuesto semanal máximo: ${presupuestoStr}

La dieta debe tener los días: Lunes, Martes, Miércoles, Jueves, Viernes, Sábado y Domingo.
Para cada día, incluye desayuno, comida y cena con: platillo, ingredientes (nombre y cantidad), calorías, macros (proteínas, carbohidratos, grasas), costo.
Al final de cada día: totales de calorías, proteínas, carbohidratos, grasas y costo.
Al final de la semana: totales semanales de calorías, proteínas, carbohidratos, grasas y costo total (no excedas el presupuesto).

Devuelve solo un objeto JSON que sea una matriz de 7 días. El JSON debe ajustarse al siguiente esquema:

[
    { "dia": "Lunes", "comidas": [{ "tipo": "Desayuno", "platillo": "...", "ingredientes": [{ "nombre": "...", "cantidad": "..." }], "calorias": 0, "macros": { "proteinas": 0, "carbohidratos": 0, "grasas": 0 }, "costo": 0 }], "totales_dia": {...} },
    ... (otros 6 días con el mismo formato)
],
{
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
  }

  
  async modificarPlatilloConIA(
    userId: string,
    dia: string,
    tipoComida: string,
    nuevoPlatillo: string,
  ): Promise<Dietaia> {
    const dietaExistente = await this.dietaiaModel.findOne({ userId }).sort({ createdAt: -1 });

    if (!dietaExistente) {
      throw new NotFoundException(`No se encontró dieta para actualizar con userId: ${userId}`);
    }

    if (!dietaExistente.resultado || !dietaExistente.resultado.semana) {
      throw new BadRequestException('La dieta no contiene datos de la semana');
    }

    const prompt = `
Eres un nutricionista profesional. Genera la información nutricional de este platillo: "${nuevoPlatillo}".
Devuelve solo el siguiente JSON:
{
  "platillo": "",
  "ingredientes": [{ "nombre": "", "cantidad": "" }],
  "calorias": 0,
  "macros": {
    "proteinas": 0,
    "carbohidratos": 0,
    "grasas": 0
  },
  "costo": 0
}
    `;

    let nuevoPlatilloEstructurado: any;
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o', // Cambiado a un modelo moderno
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 512,
        response_format: { type: 'json_object' }, // Añadido para garantizar el formato
      });

      const response = completion.choices[0].message.content;
      if (!response) throw new BadRequestException('No se recibió respuesta válida para el platillo');

      // Parseo directo debido a 'json_object'
      nuevoPlatilloEstructurado = JSON.parse(response); 
    } catch (e) {
      this.logger.error('Error generando datos del nuevo platillo con OpenAI:', e);
      throw new BadRequestException('No se pudo generar información del nuevo platillo');
    }

    const diaObj = dietaExistente.resultado.semana.find(d => d.dia.toLowerCase() === dia.toLowerCase());
    if (!diaObj) {
      throw new BadRequestException(`No se encontró el día ${dia} en la dieta`);
    }

    const comidaObj = diaObj.comidas.find(c => c.tipo?.toLowerCase() === tipoComida.toLowerCase());
    if (!comidaObj) {
      throw new BadRequestException(`No se encontró el tipo de comida ${tipoComida} en el día ${dia}`);
    }

    Object.assign(comidaObj, nuevoPlatilloEstructurado); 

    dietaExistente.markModified('resultado');
    await dietaExistente.save();

    return dietaExistente;
  }

  async update(userId: string, updateDietaiaDto: UpdateDietaiaDto): Promise<Dietaia> {
    const dietaExistente = await this.dietaiaModel.findOne({ userId }).sort({ createdAt: -1 });

    if (!dietaExistente) {
      throw new NotFoundException(`No se encontró dieta para actualizar con ID: ${userId}`);
    }

    Object.assign(dietaExistente, updateDietaiaDto);
    dietaExistente.markModified('resultado'); 
    await dietaExistente.save();

    return dietaExistente;
  }
}