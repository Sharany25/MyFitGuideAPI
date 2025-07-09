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
    @InjectModel(Dietaia.name) private dietaModel: Model<Dietaia>,
    @InjectModel(Rutina.name) private rutinaModel: Model<Rutina>,
  ) {}

  async obtenerUsuarioCompleto(userId: string) {

    const usuario = await this.usuariosModel.findById(userId).lean();
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    const dieta = await this.dietaModel.findOne({ userId }).lean();

    const rutina = await this.rutinaModel.findOne({ userId }).lean();

    return {
      usuario: {
        ...usuario,
        fechaRegistro: usuario.createdAt ? usuario.createdAt : null,
      },
      dieta: dieta || null,
      rutina: rutina || null,
    };
  }
}
