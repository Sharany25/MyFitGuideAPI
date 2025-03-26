import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ejercicio } from './schema/ejercicio.schema';
import { CreateEjercicioDto } from './dto/create-ejercicio.dto';
import { UpdateEjercicioDto } from './dto/update-ejercicio.dto';

@Injectable()
export class EjercicioService {
  constructor(
    @InjectModel(Ejercicio.name) private readonly ejercicioModel: Model<Ejercicio>,
  ) {}

  // Método para crear un nuevo ejercicio
  async create(createEjercicioDto: CreateEjercicioDto): Promise<Ejercicio> {
    const ejercicio = new this.ejercicioModel(createEjercicioDto);
    return await ejercicio.save();
  }

  // Método para obtener todos los ejercicios
  async findAll(): Promise<Ejercicio[]> {
    return await this.ejercicioModel.find().exec();
  }

  // Método para obtener un ejercicio por su id
  async findOne(id: string): Promise<Ejercicio> {
    const ejercicio = await this.ejercicioModel.findOne({ idEjercicio: id }).exec();
    if (!ejercicio) {
      throw new NotFoundException(`Ejercicio con ID ${id} no encontrado`);
    }
    return ejercicio;
  }

  // Método para actualizar un ejercicio por su id
  async update(id: string, updateEjercicioDto: UpdateEjercicioDto): Promise<Ejercicio> {
    const ejercicioActualizado = await this.ejercicioModel
      .findOneAndUpdate({ idEjercicio: id }, updateEjercicioDto, { new: true })
      .exec();
    if (!ejercicioActualizado) {
      throw new NotFoundException(`Ejercicio con ID ${id} no encontrado`);
    }
    return ejercicioActualizado;
  }

  // Método para eliminar un ejercicio por su id
  async remove(id: string): Promise<void> {
    const resultado = await this.ejercicioModel.findOneAndDelete({ idEjercicio: id }).exec();
    if (!resultado) {
      throw new NotFoundException(`Ejercicio con ID ${id} no encontrado`);
    }
  }
}
