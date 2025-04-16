import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuarios } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuarios.name) private usuariosModel: Model<Usuarios>,
  ) {}

  // Método para obtener el siguiente ID de usuario de manera secuencial
  async getNextId(): Promise<number> {
    const lastUser = await this.usuariosModel
      .findOne()
      .sort({ idUsuario: -1 })
      .exec();

    return lastUser ? lastUser.idUsuario + 1 : 1; // Si no hay usuarios, empezamos desde 1
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const nextId = await this.getNextId(); // Obtener el siguiente ID de usuario

    const createdUsuario = new this.usuariosModel({
      ...createUsuarioDto,
      idUsuario: nextId,
    });

    return createdUsuario.save();
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosModel.findByIdAndUpdate(id, updateUsuarioDto, {
      new: true,
    }).exec();
  }

  async findOne(id: number) {
    return this.usuariosModel.findOne({ idUsuario: id }).exec();
  }

  async findAll() {
    return this.usuariosModel.find().exec();
  }

  async remove(id: number) {
    return this.usuariosModel.findByIdAndDelete(id).exec();
  }
}
