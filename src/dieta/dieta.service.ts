import { Injectable } from '@nestjs/common';
import { CreateDietaDto } from './dto/create-dieta.dto';
import { UpdateDietaDto } from './dto/update-dieta.dto';

@Injectable()
export class DietaService {
  create(createDietaDto: CreateDietaDto) {
    return 'This action adds a new dieta';
  }

  findAll() {
    return `This action returns all dieta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dieta`;
  }

  update(id: number, updateDietaDto: UpdateDietaDto) {
    return `This action updates a #${id} dieta`;
  }

  remove(id: number) {
    return `This action removes a #${id} dieta`;
  }
}
