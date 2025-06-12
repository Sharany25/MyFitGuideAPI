import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricasModule } from './metricas/metricas.module';
import { LoginModule } from './login/login.module';
import { OpenaiModule } from './openai/openai.module'; // OpenaiModule ya está bien importado
import { ConfigModule } from '@nestjs/config'; // Importa ConfigModule para cargar variables de entorno
import { RutinasIAModule } from './rutinaia/rutinaia.module';
import { PruebaDietaModule } from './prueba-dieta/prueba-dieta.module';
import { PruebaRutinaModule } from './prueba-rutina/prueba-rutina.module';
import { UsuarioCompletoModule } from './usuario-completo/usuario-completo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/MyFitGuide'),
    UsuariosModule,
    MetricasModule,
    LoginModule,
    OpenaiModule,
    RutinasIAModule,
    PruebaDietaModule,
    PruebaRutinaModule,
    UsuarioCompletoModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
