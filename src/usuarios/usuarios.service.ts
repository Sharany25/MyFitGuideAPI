import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuarios } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuarios.name) private usuariosModel: Model<Usuarios>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuarios> {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, 10);
    const createdUsuario = new this.usuariosModel({
      ...createUsuarioDto,
      contraseña: hashedPassword,
    });
    return createdUsuario.save();
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuarios> {
    if (updateUsuarioDto.contraseña) {
      updateUsuarioDto.contraseña = await bcrypt.hash(updateUsuarioDto.contraseña, 10);
    }
    const updatedUsuario = await this.usuariosModel.findByIdAndUpdate(
      id,
      updateUsuarioDto,
      { new: true }
    ).exec();

    if (!updatedUsuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return updatedUsuario;
  }

  async findOne(id: string): Promise<Usuarios> {
    const usuario = await this.usuariosModel.findById(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async findAll(): Promise<Usuarios[]> {
    return this.usuariosModel.find().exec();
  }

  async remove(id: string): Promise<{ message: string }> {
    const removedUsuario = await this.usuariosModel.findByIdAndDelete(id).exec();
    if (!removedUsuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return { message: 'Usuario eliminado exitosamente' };
  }

  async validateUser(correoElectronico: string, contraseña: string): Promise<Usuarios | null> {
    const usuario = await this.usuariosModel.findOne({ correoElectronico }).lean().exec();
    if (usuario && await bcrypt.compare(contraseña, usuario.contraseña)) {
      return usuario;
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }
}
