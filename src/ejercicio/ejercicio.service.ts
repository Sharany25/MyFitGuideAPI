import { Injectable } from '@nestjs/common';
import { CreateEjercicioDto } from './dto/create-ejercicio.dto';
import { UpdateEjercicioDto } from './dto/update-ejercicio.dto';

@Injectable()
export class EjercicioService {
  create(createEjercicioDto: CreateEjercicioDto) {
    return 'This action adds a new ejercicio';
  }

  findAll() {
    return `This action returns all ejercicio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ejercicio`;
  }

  update(id: number, updateEjercicioDto: UpdateEjercicioDto) {
    return `This action updates a #${id} ejercicio`;
  }

  remove(id: number) {
    return `This action removes a #${id} ejercicio`;
  }
}
