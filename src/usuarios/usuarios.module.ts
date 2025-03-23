import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuarios, UsuarioSchema } from './schemas/usuario.schema';
import { Counter, CounterSchema } from './schemas/counter.schema';  // Importa el CounterSchema

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Usuarios.name, schema: UsuarioSchema },
      { name: Counter.name, schema: CounterSchema },  // Registra el esquema del contador
    ]),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
