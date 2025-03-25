import { Test, TestingModule } from '@nestjs/testing';
import { RecetasService } from './recetas.service';

describe('RecetasService', () => {
  let service: RecetasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecetasService],
    }).compile();

    service = module.get<RecetasService>(RecetasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
