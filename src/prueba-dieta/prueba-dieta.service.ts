// src/prueba-dieta/prueba-dieta.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePruebaDietaDto } from './dto/create-prueba-dieta.dto';
import { PruebaDieta, PruebaDietaDocument } from './schemas/prueba-dieta.schema';

@Injectable()
export class PruebaDietaService {
  constructor(
    @InjectModel(PruebaDieta.name) private dietaModel: Model<PruebaDietaDocument>,
  ) {}

  async create(data: CreatePruebaDietaDto): Promise<PruebaDieta> {
    const nuevaDieta = new this.dietaModel(data);
    return nuevaDieta.save();
  }
}
