import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuarios } from 'src/usuarios/schemas/usuario.schema';
import { PruebaDieta } from '../prueba-dieta/schemas/prueba-dieta.schema';
import { PruebaRutina } from '../prueba-rutina/schemas/prueba-rutina.schema';

@Injectable()
export class UsuarioCompletoService {
  constructor(
    @InjectModel(Usuarios.name) private usuariosModel: Model<Usuarios>,
    @InjectModel(PruebaDieta.name) private dietaModel: Model<PruebaDieta>,
    @InjectModel(PruebaRutina.name) private rutinaModel: Model<PruebaRutina>,
  ) {}

  // Endpoint para obtener toda la info completa del usuario
  async obtenerUsuarioCompleto(userId: string) {
    // 1. Buscar usuario
    const usuario = await this.usuariosModel.findById(userId).lean();
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    // 2. Buscar dieta (opcional, por userId)
    const dieta = await this.dietaModel.findOne({ userId }).lean();

    // 3. Buscar rutina (opcional, por userId)
    const rutina = await this.rutinaModel.findOne({ userId }).lean();

    // 4. Armar el objeto combinado
    return {
      usuario,
      dieta: dieta || null,
      rutina: rutina || null,
    };
  }
}
