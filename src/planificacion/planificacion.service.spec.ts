import { Test, TestingModule } from '@nestjs/testing';
import { PlanificacionService } from './planificacion.service';

describe('PlanificacionService', () => {
  let service: PlanificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanificacionService],
    }).compile();

    service = module.get<PlanificacionService>(PlanificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
