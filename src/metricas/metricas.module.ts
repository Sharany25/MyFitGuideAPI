import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricasService } from './metricas.service';
import { MetricasController } from './metricas.controller';
import { MetricaSchema, Metrica } from './schema/metricas.schema';
import { Counter, CounterSchema } from 'src/usuarios/schemas/counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Metrica.name, schema: MetricaSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [MetricasController],
  providers: [MetricasService],
  exports: [MetricasService],
})
export class MetricasModule {}
