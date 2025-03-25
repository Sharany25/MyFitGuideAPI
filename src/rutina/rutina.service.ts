import { Injectable } from '@nestjs/common';
import { CreateRutinaDto } from './dto/create-rutina.dto';
import { UpdateRutinaDto } from './dto/update-rutina.dto';

@Injectable()
export class RutinaService {
  create(createRutinaDto: CreateRutinaDto) {
    return 'This action adds a new rutina';
  }

  findAll() {
    return `This action returns all rutina`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rutina`;
  }

  update(id: number, updateRutinaDto: UpdateRutinaDto) {
    return `This action updates a #${id} rutina`;
  }

  remove(id: number) {
    return `This action removes a #${id} rutina`;
  }
}
