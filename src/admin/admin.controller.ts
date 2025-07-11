import { Controller, Post, Body, Get, Query, Delete, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin') 
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register-admin') 
  async registerAdmin(@Body() body: { email: string; password: string; role?: string }) {
    return this.adminService.createAdmin(body.email, body.password, body.role ?? 'Administrador');
  }

  @Get('activate')
  async activate(@Query('token') token: string) {
    return this.adminService.activateAdmin(token);
  }

  @Get()
async getAllAdmin() {
  return this.adminService.findAll();
}

@Delete(':id')
async deleteAdmin(@Param('id') id: string) {
  return this.adminService.deleteAdmin(id);
}


}
