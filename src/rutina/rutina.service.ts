import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rutina } from './schema/rutina.schema';
import { CreateRutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';

@Injectable()
export class RutinaService {
  constructor(
    @InjectModel(Rutina.name) private readonly rutinaModel: Model<Rutina>, // Inyectamos el modelo de Rutina
  ) {}

  // Método para crear una nueva rutina
  async create(createRutinaDto: CreateRutinaDto): Promise<Rutina> {
    const nuevaRutina = new this.rutinaModel(createRutinaDto);
    return await nuevaRutina.save();
  }

  // Método para obtener todas las rutinas
  async findAll(): Promise<Rutina[]> {
    return await this.rutinaModel.find().exec();
  }

  // Método para obtener una rutina por su id
  async findOne(id: string): Promise<Rutina> {
    const rutina = await this.rutinaModel.findOne({ idRutina: id }).exec();
    if (!rutina) {
      throw new NotFoundException(`Rutina con ID ${id} no encontrada`);
    }
    return rutina; // Retorna la rutina encontrada
  }

  // Método para actualizar una rutina
  async update(id: string, updateRutinaDto: UpdateRutinaDto): Promise<Rutina> {
    const rutinaActualizada = await this.rutinaModel
      .findOneAndUpdate({ idRutina: id }, updateRutinaDto, { new: true }) 
      .exec();
    if (!rutinaActualizada) {
      throw new NotFoundException(`Rutina con ID ${id} no encontrada`); 
    }
    return rutinaActualizada;
  }

  // Método para eliminar una rutina por su id
  async remove(id: string): Promise<void> {
    const resultado = await this.rutinaModel.findOneAndDelete({ idRutina: id }).exec();
    if (!resultado) {
      throw new NotFoundException(`Rutina con ID ${id} no encontrada`);
    }
  }
}
