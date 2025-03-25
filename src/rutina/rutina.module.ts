import { Module } from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { RutinaController } from './rutina.controller';

@Module({
  controllers: [RutinaController],
  providers: [RutinaService],
})
export class RutinaModule {}
