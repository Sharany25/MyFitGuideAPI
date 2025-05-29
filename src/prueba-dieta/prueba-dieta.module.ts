// src/prueba-dieta/prueba-dieta.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PruebaDietaController } from './prueba-dieta.controller';
import { PruebaDietaService } from './prueba-dieta.service';
import { PruebaDieta, PruebaDietaSchema } from './schemas/prueba-dieta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PruebaDieta.name, schema: PruebaDietaSchema },
    ]),
  ],
  controllers: [PruebaDietaController],
  providers: [PruebaDietaService],
})
export class PruebaDietaModule {}
