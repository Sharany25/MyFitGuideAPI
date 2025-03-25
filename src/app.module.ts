import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricasModule } from './metricas/metricas.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/MyFitGuide'),
    UsuariosModule,
    MetricasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
