import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingrediente } from './schema/ingredientes.schema';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';

@Injectable()
export class IngredientesService {
  constructor(
    @InjectModel(Ingrediente.name) private readonly ingredienteModel: Model<Ingrediente>,
  ) {}

  // Método para crear un nuevo ingrediente
  async create(createIngredienteDto: CreateIngredienteDto): Promise<Ingrediente> {
    const nuevoIngrediente = new this.ingredienteModel(createIngredienteDto);
    return nuevoIngrediente.save();
  }

  // Método para obtener todos los ingredientes
  async findAll(): Promise<Ingrediente[]> {
    return this.ingredienteModel.find().exec();
  }

  // Método para obtener un ingrediente por su id
  async findOne(id: string): Promise<Ingrediente> {
    const ingrediente = await this.ingredienteModel.findOne({ idIngredientes: id }).exec();
    if (!ingrediente) {
      throw new NotFoundException(`Ingrediente con ID ${id} no encontrado`);
    }
    return ingrediente;
  }

  // Método para actualizar un ingrediente por su id
  async update(id: string, updateIngredienteDto: UpdateIngredienteDto): Promise<Ingrediente> {
    const ingredienteActualizado = await this.ingredienteModel
      .findOneAndUpdate({ idIngredientes: id }, updateIngredienteDto, { new: true })
      .exec();
    if (!ingredienteActualizado) {
      throw new NotFoundException(`Ingrediente con ID ${id} no encontrado`);
    }
    return ingredienteActualizado;
  }

  // Método para eliminar un ingrediente por su id
  async remove(id: string): Promise<void> {
    const resultado = await this.ingredienteModel.findOneAndDelete({ idIngredientes: id }).exec();
    if (!resultado) {
      throw new NotFoundException(`Ingrediente con ID ${id} no encontrado`);
    }
  }
}
