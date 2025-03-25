import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DietaService } from './dieta.service';
import { DietaController } from './dieta.controller';
import { Dieta, DietaSchema } from './schema/dieta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dieta.name, schema: DietaSchema }]),
  ],
  controllers: [DietaController],
  providers: [DietaService],
  exports: [DietaService],
})
export class DietaModule {}
