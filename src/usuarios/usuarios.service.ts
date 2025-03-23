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
      { new: true, upsert: true } // Si no existe, lo crea
    );
    return sequenceDocument.sequence_value; // Asegúrate de usar 'sequence_value' en vez de 'count'
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    // Obtener el próximo ID de usuario
    const nextId = await this.getNextSequenceValue('usuarios');

    // Crear el nuevo usuario con el ID automático
    const createdUsuario = new this.usuariosModel({
      ...createUsuarioDto,
      idUsuario: nextId,
    });

    return createdUsuario.save();
  }

  // Otros métodos del servicio
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
