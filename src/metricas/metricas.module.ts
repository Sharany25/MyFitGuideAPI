import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricasService } from './metricas.service';
import { MetricasController } from './metricas.controller';
import { MetricaSchema, Metrica } from './schema/metricas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Metrica.name, schema: MetricaSchema },
    ]),
  ],
  controllers: [MetricasController],
  providers: [MetricasService],
  exports: [MetricasService],
})
export class MetricasModule {}