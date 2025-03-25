import { Module } from '@nestjs/common';
import { IngredientesService } from './ingredientes.service';
import { IngredientesController } from './ingredientes.controller';

@Module({
  controllers: [IngredientesController],
  providers: [IngredientesService],
})
export class IngredientesModule {}
