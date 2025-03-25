import { Test, TestingModule } from '@nestjs/testing';
import { EjercicioService } from './ejercicio.service';

describe('EjercicioService', () => {
  let service: EjercicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EjercicioService],
    }).compile();

    service = module.get<EjercicioService>(EjercicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
