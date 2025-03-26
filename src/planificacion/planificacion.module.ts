import { Module } from '@nestjs/common';
import { PlanificacionService } from './planificacion.service';
import { PlanificacionController } from './planificacion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Planificacion, PlanificacionSchema } from './schema/planificacion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Planificacion.name, schema: PlanificacionSchema }]),
  ],
  controllers: [PlanificacionController],
  providers: [PlanificacionService],
})
export class PlanificacionModule {}
