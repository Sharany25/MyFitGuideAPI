import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/create-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.loginService.login(loginDto);
    } catch (error) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  }
}
