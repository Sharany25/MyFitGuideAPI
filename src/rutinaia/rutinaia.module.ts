import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RutinasIAService } from './rutinaia.service';
import { RutinasIAController } from './rutinaia.controller';
import { Rutina, RutinaSchema } from './schema/rutina.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rutina.name, schema: RutinaSchema }]),
  ],
  controllers: [RutinasIAController],
  providers: [RutinasIAService],
})
export class RutinasIAModule {}
