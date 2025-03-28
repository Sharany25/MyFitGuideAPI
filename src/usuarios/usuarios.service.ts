import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter } from './schemas/counter.schema';
import { Usuarios } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuarios.name) private usuariosModel: Model<Usuarios>,
    @InjectModel(Counter.name) private counterModel: Model<Counter>
  ) {}

  // Método para obtener el siguiente ID de usuario
  async getNextSequenceValue(sequenceName: string): Promise<number> {
    const sequenceDocument = await this.counterModel.findOneAndUpdate(
      { name: sequenceName },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    return sequenceDocument.sequence_value;
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const nextId = await this.getNextSequenceValue('usuarios');

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
