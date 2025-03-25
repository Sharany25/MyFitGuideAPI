import { Test, TestingModule } from '@nestjs/testing';
import { PlanificacionController } from './planificacion.controller';
import { PlanificacionService } from './planificacion.service';

describe('PlanificacionController', () => {
  let controller: PlanificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanificacionController],
      providers: [PlanificacionService],
    }).compile();

    controller = module.get<PlanificacionController>(PlanificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
