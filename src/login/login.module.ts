import { Module, forwardRef } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module'; 

@Module({
  imports: [forwardRef(() => UsuariosModule)], 
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
