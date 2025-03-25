import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Receta } from './schema/receta.schema';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';

@Injectable()
export class RecetasService {
  constructor(
    @InjectModel(Receta.name) private readonly recetaModel: Model<Receta>,
  ) {}

  // Crear una nueva receta
  async create(createRecetaDto: CreateRecetaDto): Promise<Receta> {
    const nuevaReceta = new this.recetaModel(createRecetaDto);
    return nuevaReceta.save();
  }

  // Obtener todas las recetas
  async findAll(): Promise<Receta[]> {
    return this.recetaModel.find().exec();
  }

  // Obtener una receta por ID
  async findOne(id: string): Promise<Receta> {
    const receta = await this.recetaModel.findOne({ idReceta: id }).exec();
    if (!receta) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }
    return receta;
  }

  // Actualizar una receta por ID
  async update(id: string, updateRecetaDto: UpdateRecetaDto): Promise<Receta> {
    const recetaActualizada = await this.recetaModel
      .findOneAndUpdate({ idReceta: id }, updateRecetaDto, { new: true })
      .exec();
    if (!recetaActualizada) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }
    return recetaActualizada;
  }

  // Eliminar una receta por ID
  async remove(id: string): Promise<void> {
    const resultado = await this.recetaModel.findOneAndDelete({ idReceta: id }).exec();
    if (!resultado) {
      throw new NotFoundException(`Receta con ID ${id} no encontrada`);
    }
  }
}
