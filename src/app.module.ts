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
import { LoginModule } from './login/login.module';
import { OpenaiModule } from './openai/openai.module'; // OpenaiModule ya está bien importado
import { ConfigModule } from '@nestjs/config'; // Importa ConfigModule para cargar variables de entorno

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Asegúrate de que tu archivo .env esté en la raíz del proyecto
      isGlobal: true, // Hace que la configuración esté disponible globalmente
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/MyFitGuide'),
    UsuariosModule,
    MetricasModule,
    DietaModule,
    RecetasModule,
    IngredientesModule,
    RutinaModule,
    EjercicioModule,
    PlanificacionModule,
    LoginModule,
    OpenaiModule, // Este es tu módulo de OpenAI
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
