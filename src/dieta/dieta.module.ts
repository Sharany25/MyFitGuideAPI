import { Module } from '@nestjs/common';
import { DietaService } from './dieta.service';
import { DietaController } from './dieta.controller';

@Module({
  controllers: [DietaController],
  providers: [DietaService],
})
export class DietaModule {}
