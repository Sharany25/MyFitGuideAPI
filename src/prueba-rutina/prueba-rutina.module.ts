import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PruebaRutinaController } from './prueba-rutina.controller';
import { PruebaRutinaService } from './prueba-rutina.service';
import { PruebaRutina, PruebaRutinaSchema } from './schemas/prueba-rutina.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PruebaRutina.name, schema: PruebaRutinaSchema },
    ]),
  ],
  controllers: [PruebaRutinaController],
  providers: [PruebaRutinaService],
})
export class PruebaRutinaModule {}
