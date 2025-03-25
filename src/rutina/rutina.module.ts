import { Module } from '@nestjs/common';
import { RutinaService } from './rutina.service';
import { RutinaController } from './rutina.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rutina, RutinaSchema } from './schema/rutina.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rutina.name, schema: RutinaSchema }]), // Importamos el esquema de Rutina
  ],
  controllers: [RutinaController], // Registramos el controlador
  providers: [RutinaService], // Registramos el servicio
})
export class RutinaModule {}
