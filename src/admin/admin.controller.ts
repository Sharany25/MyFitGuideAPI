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

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }

  @Post('verify')
  async verify(@Body(new ValidationPipe({ whitelist: true })) body: any) {
    const correo = body.correo;
    const token = body.token ?? body.verificationToken;
    const result = await this.adminService.verifyToken(correo, token);
    return { verified: result };
  }

  @Post('login')
  async login(@Body() body: LoginAdminDto) {
    const { correo, contrasena } = body;
    const result = await this.adminService.login(correo, contrasena);

    if (result.status === 401) {
      throw new BadRequestException(result.message);
    }
    return result;
  }
}
