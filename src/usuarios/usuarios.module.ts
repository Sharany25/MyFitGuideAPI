import { Module, forwardRef } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuarios, UsuarioSchema } from './schemas/usuario.schema';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuarios.name, schema: UsuarioSchema }]),
    forwardRef(() => LoginModule),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
