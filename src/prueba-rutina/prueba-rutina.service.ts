import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePruebaRutinaDto } from './dto/create-prueba-rutina.dto';
import { UpdatePruebaRutinaDto } from './dto/update-prueba-rutina.dto';
import { PruebaRutina, PruebaRutinaDocument } from './schemas/prueba-rutina.schema';

@Injectable()
export class PruebaRutinaService {
  constructor(
    @InjectModel(PruebaRutina.name)
    private readonly rutinaModel: Model<PruebaRutinaDocument>,
  ) {}

  create(data: CreatePruebaRutinaDto) {
    const rutina = new this.rutinaModel(data);
    return rutina.save();
  }

  findAll() {
    return this.rutinaModel.find().exec();
  }

  findOne(id: string) {
    return this.rutinaModel.findById(id).exec();
  }

  update(id: string, dto: UpdatePruebaRutinaDto) {
    return this.rutinaModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  remove(id: string) {
    return this.rutinaModel.findByIdAndDelete(id).exec();
  }

  // NUEVO: Buscar por userId
  findByUserId(userId: number) {
    return this.rutinaModel.findOne({ userId }).exec();
  }
}
