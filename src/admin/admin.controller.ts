import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';

class VerifyTokenDto {
  correo: string;
  token: string;
}

class UpdateAdminDto {
  correo?: string;
  contrasena?: string;
  foto?: string;
  rol?: string;
}

class LoginAdminDto {
  correo: string;
  contrasena: string;
}

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Crear administrador
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  // Obtener todos los administradores
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  // Obtener un administrador por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  // Actualizar administrador
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  // Eliminar administrador
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }

  // Verificación de token para el correo del administrador
  @Post('verify')
  async verify(@Body(new ValidationPipe({ whitelist: true })) body: any) {
    const correo = body.correo;
    const token = body.token ?? body.verificationToken;
    if (!correo || !token) throw new BadRequestException("Correo y token requeridos");
    const result = await this.adminService.verifyToken(correo, token);
    return { verified: result };
  }

  // Login de administrador
  @Post('login')
  async login(@Body() body: LoginAdminDto) {
    const { correo, contrasena } = body;
    if (!correo || !contrasena) {
      throw new BadRequestException("Correo y contraseña requeridos");
    }
    const result = await this.adminService.login(correo, contrasena);

    if (result.status === 401) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
}
