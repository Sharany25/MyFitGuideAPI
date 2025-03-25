import { Injectable } from '@nestjs/common';
import { CreatePlanificacionDto } from './dto/create-planificacion.dto';
import { UpdatePlanificacionDto } from './dto/update-planificacion.dto';

@Injectable()
export class PlanificacionService {
  create(createPlanificacionDto: CreatePlanificacionDto) {
    return 'This action adds a new planificacion';
  }

  findAll() {
    return `This action returns all planificacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planificacion`;
  }

  update(id: number, updatePlanificacionDto: UpdatePlanificacionDto) {
    return `This action updates a #${id} planificacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} planificacion`;
  }
}
