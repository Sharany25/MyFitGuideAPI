import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Metrica } from './schema/metricas.schema';
import { CreateMetricaDto } from './dto/create-metrica.dto';
import { UpdateMetricaDto } from './dto/update-metrica.dto';
import { v4 as uuidv4 } from 'uuid';  // Usamos UUID si es necesario

@Injectable()
export class MetricasService {
  constructor(
    @InjectModel(Metrica.name) private readonly metricaModel: Model<Metrica>
  ) {}


  async create(createMetricaDto: CreateMetricaDto): Promise<Metrica> {
    const nuevaMetrica = new this.metricaModel({
      idMetricas: uuidv4(),
      ...createMetricaDto,
    });

    try {
      return await nuevaMetrica.save();
    } catch (error) {
      throw new Error('Error al guardar la métrica: ' + error.message);
    }
  }

  async findAll(): Promise<Metrica[]> {
    return await this.metricaModel.find().exec();
  }

  async findOne(id: string): Promise<Metrica> {
    const metrica = await this.metricaModel.findOne({ idMetricas: id }).exec();
    if (!metrica) {
      throw new NotFoundException(`Métrica con ID ${id} no encontrada`);
    }
    return metrica;
  }

  async update(id: string, updateMetricaDto: UpdateMetricaDto): Promise<Metrica> {
    const metricaActualizada = await this.metricaModel
      .findOneAndUpdate({ idMetricas: id }, updateMetricaDto, { new: true })
      .exec();
    if (!metricaActualizada) {
      throw new NotFoundException(`Métrica con ID ${id} no encontrada`);
    }
    return metricaActualizada;
  }

  async remove(id: string): Promise<void> {
    const resultado = await this.metricaModel.findOneAndDelete({ idMetricas: id }).exec();
    if (!resultado) {
      throw new NotFoundException(`Métrica con ID ${id} no encontrada`);
    }
  }
}
