import { Test, TestingModule } from '@nestjs/testing';
import { IngredientesController } from './ingredientes.controller';
import { IngredientesService } from './ingredientes.service';

describe('IngredientesController', () => {
  let controller: IngredientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientesController],
      providers: [IngredientesService],
    }).compile();

    controller = module.get<IngredientesController>(IngredientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
