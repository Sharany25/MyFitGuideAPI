// src/rutinasIA/rutinasIA.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rutina } from './schema/rutina.schema';
import { Model } from 'mongoose';
import { CrearRutinaDto } from './dto/create-rutinaia.dto';
import OpenAI from 'openai';

@Injectable()
export class RutinasIAService {
  private openai: OpenAI;

  constructor(
    @InjectModel(Rutina.name) private rutinaModelo: Model<Rutina>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generarRutina(crearRutinaDto: CrearRutinaDto): Promise<Rutina> {
    const prompt = this.crearPrompt(crearRutinaDto);

    const respuesta = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const rutinaGenerada = respuesta.choices[0].message.content;

    const nuevaRutina = new this.rutinaModelo({
      ...crearRutinaDto,
      rutinaGenerada,
    });

    return nuevaRutina.save();
  }

  private crearPrompt(datos: CrearRutinaDto): string {
    return `
  Eres un entrenador personal experto en desarrollo muscular, pérdida de grasa y acondicionamiento físico.
  
  Tu tarea es crear una rutina personalizada y profesional para el siguiente usuario:
  
  🧍 Nombre: ${datos.nombre}  
  📅 Edad: ${datos.edad}  
  🎯 Objetivo: ${datos.objetivo}  
  🏋️ Lugar de entrenamiento: ${datos.preferencias.join(', ')}  
  📆 Días disponibles por semana: ${datos.dias}  
  
  🔧 Requisitos:
  - Divide la rutina en ${datos.dias} días.
  - Usa ejercicios compuestos y aislados.
  - Especifica series, repeticiones y descanso.
  - Separa los días por grupos musculares (si aplica).
  - Incluye calentamiento al inicio de cada día.
  - Incluye estiramientos o movilidad al final de cada día.
  - No repitas ejercicios innecesariamente.
  - Si el objetivo es ganar masa muscular, enfócate en volumen progresivo.
  - Si el objetivo es perder grasa, incluye cardio y entrenamiento metabólico.
  - Usa un formato limpio, fácil de leer y bien estructurado como el siguiente:
  
  ---
  
  🏋️ Día 1 — [Grupo Muscular o Enfoque]  
  🔸 **Calentamiento:**  
  - 5-10 min de cardio suave  
  - Movilidad articular (hombros, caderas, rodillas)
  
  🔹 **Rutina Principal:**  
  1. Sentadilla con barra — 4x10 — Descanso: 90 seg  
  2. Prensa de piernas — 3x12 — Descanso: 60 seg  
  3. Curl femoral — 4x12 — Descanso: 60 seg  
  4. Elevaciones de talones — 4x20 — Descanso: 45 seg
  
  🔸 **Estiramientos Finales:**  
  - Piernas completas 5 min
  
  ---
  
  Genera solo el contenido de la rutina. No expliques nada adicional. Sé profesional, técnico y detallado. Responde en español.
    `.trim();
  }  
}  
