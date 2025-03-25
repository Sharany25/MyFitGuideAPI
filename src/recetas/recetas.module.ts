import { Module } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { RecetasController } from './recetas.controller';

@Module({
  controllers: [RecetasController],
  providers: [RecetasService],
})
export class RecetasModule {}
