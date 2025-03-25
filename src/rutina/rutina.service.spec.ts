import { Test, TestingModule } from '@nestjs/testing';
import { RutinaService } from './rutina.service';

describe('RutinaService', () => {
  let service: RutinaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RutinaService],
    }).compile();

    service = module.get<RutinaService>(RutinaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
