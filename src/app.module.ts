import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModule } from './login/login.module';
import { ConfigModule } from '@nestjs/config';
import { RutinasIAModule } from './rutinaia/rutinaia.module';
import { UsuarioCompletoModule } from './usuario-completo/usuario-completo.module';
import { DietaiaModule } from './dietaia/dietaia.module';
import { FavoritosModule } from './favoritos/favoritos.module';
import { QuejaSugerenciaModule } from './queja-sugerencia/queja-sugerencia.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://mongo:MHofpiGYletkiEpWIZHlHzVyusXXchQy@shuttle.proxy.rlwy.net:11891'),
    UsuariosModule,
    LoginModule,
    RutinasIAModule,
    UsuarioCompletoModule,
    DietaiaModule,
    FavoritosModule,
    QuejaSugerenciaModule,
    AdminModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
