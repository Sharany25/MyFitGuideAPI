import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuarios } from 'src/usuarios/schemas/usuario.schema';
import { Dietaia } from 'src/dietaia/schemas/dietaia.schemas';
import { Rutina } from 'src/rutinaia/schema/rutina.schema';

@Injectable()
export class UsuarioCompletoService {
  constructor(
    @InjectModel(Usuarios.name) private usuariosModel: Model<Usuarios>,
    @InjectModel(Dietaia.name) private dietaModel: Model<Dietaia>,      // <-- Cambiado aquí
    @InjectModel(Rutina.name) private rutinaModel: Model<Rutina>,
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

    // 4. Armar el objeto combinado, añadiendo fechaRegistro
    return {
      usuario: {
        ...usuario,
        fechaRegistro: usuario.createdAt ? usuario.createdAt : null, // <-- campo extra
      },
      dieta: dieta || null,
      rutina: rutina || null,
    };
  }
}
