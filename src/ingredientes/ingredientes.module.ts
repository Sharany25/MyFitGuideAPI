import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientesController } from './ingredientes.controller';
import { IngredientesService } from './ingredientes.service';
import { Ingrediente, IngredienteSchema } from './schema/ingredientes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ingrediente.name, schema: IngredienteSchema }]),
  ],
  controllers: [IngredientesController],
  providers: [IngredientesService],
})
export class IngredientesModule {}
