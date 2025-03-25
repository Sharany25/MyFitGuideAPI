import { Test, TestingModule } from '@nestjs/testing';
import { DietaService } from './dieta.service';

describe('DietaService', () => {
  let service: DietaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DietaService],
    }).compile();

    service = module.get<DietaService>(DietaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
