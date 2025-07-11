import { Module, forwardRef } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module'; 
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [forwardRef(() => UsuariosModule), forwardRef(() => AdminModule)], 
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
