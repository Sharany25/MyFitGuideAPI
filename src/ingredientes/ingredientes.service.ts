import { Injectable } from '@nestjs/common';
import { CreateIngredienteDto } from './dto/create-ingrediente.dto';
import { UpdateIngredienteDto } from './dto/update-ingrediente.dto';

@Injectable()
export class IngredientesService {
  create(createIngredienteDto: CreateIngredienteDto) {
    return 'This action adds a new ingrediente';
  }

  findAll() {
    return `This action returns all ingredientes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingrediente`;
  }

  update(id: number, updateIngredienteDto: UpdateIngredienteDto) {
    return `This action updates a #${id} ingrediente`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingrediente`;
  }
}
