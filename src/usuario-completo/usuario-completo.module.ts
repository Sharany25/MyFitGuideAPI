import { Module, forwardRef } from '@nestjs/common';
import { UsuarioCompletoService } from './usuario-completo.service';
import { UsuarioCompletoController } from './usuario-completo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuarios, UsuarioSchema } from 'src/usuarios/schemas/usuario.schema';
import { PruebaDieta, PruebaDietaSchema } from '../prueba-dieta/schemas/prueba-dieta.schema';
import { PruebaRutina, PruebaRutinaSchema } from '../prueba-rutina/schemas/prueba-rutina.schema';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usuarios.name, schema: UsuarioSchema },
      { name: PruebaDieta.name, schema: PruebaDietaSchema },
      { name: PruebaRutina.name, schema: PruebaRutinaSchema },
    ]),
    forwardRef(() => LoginModule),
  ],
  controllers: [UsuarioCompletoController],
  providers: [UsuarioCompletoService],
  exports: [UsuarioCompletoService],
})
export class UsuarioCompletoModule {}
