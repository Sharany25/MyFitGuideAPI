import { Module, forwardRef } from '@nestjs/common';
import { UsuarioCompletoService } from './usuario-completo.service';
import { UsuarioCompletoController } from './usuario-completo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuarios, UsuarioSchema } from 'src/usuarios/schemas/usuario.schema';
import { Dietaia, DietaiaSchema } from 'src/dietaia/schemas/dietaia.schemas';
import { Rutina, RutinaSchema } from 'src/rutinaia/schema/rutina.schema';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usuarios.name, schema: UsuarioSchema },
      { name: Dietaia.name, schema: DietaiaSchema },
      { name: Rutina.name, schema: RutinaSchema },
    ]),
    forwardRef(() => LoginModule),
  ],
  controllers: [UsuarioCompletoController],
  providers: [UsuarioCompletoService],
  exports: [UsuarioCompletoService],
})
export class UsuarioCompletoModule {}
