import { Module } from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { EjercicioController } from './ejercicio.controller';

@Module({
  controllers: [EjercicioController],
  providers: [EjercicioService],
})
export class EjercicioModule {}
