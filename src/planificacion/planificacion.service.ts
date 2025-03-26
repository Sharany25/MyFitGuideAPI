import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Planificacion } from './schema/planificacion.schema';
import { CreatePlanificacionDto } from './dto/create-planificacion.dto';
import { UpdatePlanificacionDto } from './dto/update-planificacion.dto';

@Injectable()
export class PlanificacionService {
  constructor(
    @InjectModel(Planificacion.name) private readonly planificacionModel: Model<Planificacion>,
  ) {}

  // Crear una nueva planificación
  async create(createPlanificacionDto: CreatePlanificacionDto): Promise<Planificacion> {
    const nuevaPlanificacion = new this.planificacionModel(createPlanificacionDto);
    return await nuevaPlanificacion.save();
  }

  // Obtener todas las planificaciones
  async findAll(): Promise<Planificacion[]> {
    return await this.planificacionModel.find().exec();
  }

  // Obtener una planificación por su id
  async findOne(id: string): Promise<Planificacion> {
    const planificacion = await this.planificacionModel.findOne({ idPlanificacion: id }).exec();
    if (!planificacion) {
      throw new NotFoundException(`Planificación con ID ${id} no encontrada`);
    }
    return planificacion;
  }

  // Actualizar una planificación por su id
  async update(id: string, updatePlanificacionDto: UpdatePlanificacionDto): Promise<Planificacion> {
    const planificacionActualizada = await this.planificacionModel
      .findOneAndUpdate({ idPlanificacion: id }, updatePlanificacionDto, { new: true })
      .exec();
    if (!planificacionActualizada) {
      throw new NotFoundException(`Planificación con ID ${id} no encontrada`);
    }
    return planificacionActualizada;
  }

  // Eliminar una planificación por su id
  async remove(id: string): Promise<void> {
    const resultado = await this.planificacionModel.findOneAndDelete({ idPlanificacion: id }).exec();
    if (!resultado) {
      throw new NotFoundException(`Planificación con ID ${id} no encontrada`);
    }
  }
}
