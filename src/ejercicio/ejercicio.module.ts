import { Module } from '@nestjs/common';
import { EjercicioService } from './ejercicio.service';
import { EjercicioController } from './ejercicio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ejercicio, EjercicioSchema } from './schema/ejercicio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ejercicio.name, schema: EjercicioSchema },
    ]),
  ],
  controllers: [EjercicioController],
  providers: [EjercicioService],
})
export class EjercicioModule {}
