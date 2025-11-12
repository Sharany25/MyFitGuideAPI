import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dietaia, DietaiaDocument } from './schemas/dietaia.schemas';
import { CreateDietaiaDto } from './dto/create-dietaia.dto';
import { UpdateDietaiaDto } from './dto/update-dietaia.dto';

// Define el tipo de dato esperado de OpenAI para tener tipado estricto
export interface DietaAIGenerada {
  semana: {
    dia: string;
    comidas: any[]; // Lo ideal sería definir la estructura interna de 'comidas'
    totales_dia: { [key: string]: number };
  }[];
  totales_semana: { [key: string]: number };
}

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
   * Se utiliza 'gpt-4o' y response_format: 'json_object' para garantizar JSON válido.
   */
  async create(createDietaiaDto: CreateDietaiaDto): Promise<{ mensaje: string; resultado: DietaAIGenerada }> {
    const { genero, altura, peso, objetivo, alergias, presupuesto } = createDietaiaDto;

    // Validación temprana (aunque el pipe de validación de NestJS ya lo haría)
    if (!genero || !altura || !peso || !objetivo || !presupuesto) {
      // Esta validación ya está cubierta por el DTO y ValidationPipe
      throw new BadRequestException('Faltan datos necesarios para generar la dieta');
    }

    // 1. Construcción del Prompt (Se mantiene la lógica detallada del prompt)
    const prompt = this.buildDietaPrompt(genero, altura, peso, objetivo, alergias, presupuesto);

    try {
      // 2. Llamada a OpenAI con garantía de JSON (Modelo gpt-4o recomendado)
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o', // Usar un modelo moderno que soporte JSON Mode
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 4096,
        // *** ESTA ES LA CLAVE PARA EVITAR EL ERROR DE JSON PARSE ***
        response_format: { type: 'json_object' }, 
      });

      const jsonString = completion.choices[0].message.content;
      
      if (!jsonString) {
        throw new BadRequestException('No se recibió contenido JSON de OpenAI.');
      }

      // 3. Parseo Directo: El 'json_object' garantiza que el string es parseable.
      // Ya no necesitamos regex ni sanitización compleja.
      const resultadoJSON: DietaAIGenerada = JSON.parse(jsonString);

      // 4. Persistencia en la base de datos
      const nuevaDieta = new this.dietaiaModel({
        ...createDietaiaDto,
        resultado: resultadoJSON,
        userId: createDietaiaDto.userId,
        createdAt: new Date(), // Añadir fecha de creación si no está en el Schema
      });

      await nuevaDieta.save();

      return { mensaje: 'Dieta generada exitosamente', resultado: resultadoJSON };
    } catch (error) {
      // 5. Manejo de Errores: Capturar errores de OpenAI y de JSON.parse
      this.logger.error('Error durante la generación o persistencia de la dieta:', error);
      
      // Si el error es una instancia de Error, lanzamos un error controlado.
      // Si el error es de OpenAI (por API Key, rate limit, etc.), es 500.
      if (error.status === 400 || error instanceof BadRequestException) {
         // Mantener el 400 si fue un error de validación interna.
         throw error;
      }
      
      // Error genérico de la llamada a la API o del parseo (Internal Server Error)
      throw new BadRequestException('Error al obtener o procesar la respuesta de OpenAI. Por favor, inténtelo de nuevo.');
    }
  }

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

  // --- Otros métodos se mantienen iguales (get, modificarPlatilloConIA, update) ---
  
  async getDietaSemanaPorUsuario(userId: string): Promise<{ userId: string; resultado: DietaAIGenerada; creado: Date | undefined }> {
    const dieta = await this.dietaiaModel.findOne({ userId }).sort({ createdAt: -1 }).lean() as { userId: string; resultado: DietaAIGenerada; createdAt?: Date };
    if (!dieta || !dieta.resultado) {
      throw new NotFoundException('No existe una dieta detallada para este usuario');
    }
    return {
      userId: dieta.userId,
      resultado: dieta.resultado,
      creado: dieta.createdAt,
    };
  }

  // --- MÉTODO: OBTENER TODAS LAS DIETAS ---
  /**
   * Obtiene todas las dietas de la base de datos. 
   * Nota: Este endpoint debe estar protegido con un Guard de Administrador/Superusuario.
   */
  async findAll(): Promise<Dietaia[]> {
    return this.dietaiaModel.find().lean();
  }
  // ----------------------------------------------

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

    // Se asume que 'comidaObj' tiene una propiedad para el platillo o se reemplaza.
    // Depende de la estructura exacta de 'comidas' que genera la IA.
    // Asumiendo que se modifica un campo dentro del objeto comidaObj:
    // comidaObj.platillo = nuevoPlatilloEstructurado.platillo; 
    // comidaObj.ingredientes = nuevoPlatilloEstructurado.ingredientes;
    // ...

    // Por ahora, solo reemplazaremos el objeto si la estructura de 'comidas' es plana.
    // Si la estructura de 'comidas' en el JSON original es: [{ tipo: 'Desayuno', ...datos_del_platillo... }], 
    // entonces deberíamos asignar las nuevas propiedades.

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
    // **Importante:** Mongoose necesita markModified si actualizas un subdocumento
    dietaExistente.markModified('resultado'); 
    await dietaExistente.save();

    return dietaExistente;
  }
}