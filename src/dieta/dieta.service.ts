import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDietaDto } from './dto/create-dieta.dto';
import { UpdateDietaDto } from './dto/update-dieta.dto';
import { Dieta } from './schema/dieta.schema';

@Injectable()
export class DietaService {
  constructor(
    @InjectModel(Dieta.name) private readonly dietaModel: Model<Dieta>,
  ) {}

  // Crear una nueva dieta
  async create(createDietaDto: CreateDietaDto): Promise<Dieta> {
    const nuevaDieta = new this.dietaModel(createDietaDto);
    return await nuevaDieta.save();
  }

  // Obtener todas las dietas
  async findAll(): Promise<Dieta[]> {
    return await this.dietaModel.find().exec();
  }

  // Obtener una dieta por ID
  async findOne(id: string): Promise<Dieta> {
    const dieta = await this.dietaModel.findById(id).exec();
    if (!dieta) {
      throw new NotFoundException(`Dieta con ID ${id} no encontrada`);
    }
    return dieta;
  }

  // Actualizar una dieta por ID
  async update(id: string, updateDietaDto: UpdateDietaDto): Promise<Dieta> {
    const dietaActualizada = await this.dietaModel
      .findByIdAndUpdate(id, updateDietaDto, { new: true })
      .exec();
    if (!dietaActualizada) {
      throw new NotFoundException(`Dieta con ID ${id} no encontrada`);
    }
    return dietaActualizada;
  }

  // Eliminar una dieta por ID
  async remove(id: string): Promise<void> {
    const resultado = await this.dietaModel.findByIdAndDelete(id).exec();
    if (!resultado) {
      throw new NotFoundException(`Dieta con ID ${id} no encontrada`);
    }
  }
}
