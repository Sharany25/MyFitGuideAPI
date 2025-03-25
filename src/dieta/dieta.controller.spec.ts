import { Test, TestingModule } from '@nestjs/testing';
import { DietaController } from './dieta.controller';
import { DietaService } from './dieta.service';

describe('DietaController', () => {
  let controller: DietaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DietaController],
      providers: [DietaService],
    }).compile();

    controller = module.get<DietaController>(DietaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
