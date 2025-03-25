import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricasModule } from './metricas/metricas.module';
import { DietaModule } from './dieta/dieta.module';
import { PlanificacionModule } from './planificacion/planificacion.module';
import { EjercicioModule } from './ejercicio/ejercicio.module';
import { RutinaModule } from './rutina/rutina.module';
import { IngredientesModule } from './ingredientes/ingredientes.module';
import { RecetasModule } from './recetas/recetas.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/MyFitGuide'),
    UsuariosModule,
    MetricasModule,
    DietaModule,
    RecetasModule,
    IngredientesModule,
    RutinaModule,
    EjercicioModule,
    PlanificacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
