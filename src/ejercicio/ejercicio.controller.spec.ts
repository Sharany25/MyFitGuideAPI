import { Test, TestingModule } from '@nestjs/testing';
import { EjercicioController } from './ejercicio.controller';
import { EjercicioService } from './ejercicio.service';

describe('EjercicioController', () => {
  let controller: EjercicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EjercicioController],
      providers: [EjercicioService],
    }).compile();

    controller = module.get<EjercicioController>(EjercicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
