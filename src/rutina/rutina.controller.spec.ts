import { Test, TestingModule } from '@nestjs/testing';
import { RutinaController } from './rutina.controller';
import { RutinaService } from './rutina.service';

describe('RutinaController', () => {
  let controller: RutinaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RutinaController],
      providers: [RutinaService],
    }).compile();

    controller = module.get<RutinaController>(RutinaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
