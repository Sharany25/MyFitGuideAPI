import { Module } from '@nestjs/common';
import { PlanificacionService } from './planificacion.service';
import { PlanificacionController } from './planificacion.controller';

@Module({
  controllers: [PlanificacionController],
  providers: [PlanificacionService],
})
export class PlanificacionModule {}
