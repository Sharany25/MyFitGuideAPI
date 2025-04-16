import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuarios } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt'; // Asegúrate de instalar bcrypt para el manejo seguro de contraseñas

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuarios.name) private usuariosModel: Model<Usuarios>,  // Inyección del modelo de Mongoose para Usuarios
  ) {}

  // Crear un nuevo usuario
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuarios> {
    // Hash de la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(createUsuarioDto.contraseña, 10);
    const createdUsuario = new this.usuariosModel({
      ...createUsuarioDto,
      contraseña: hashedPassword, // Se guarda la contraseña hasheada
    });
    return createdUsuario.save(); // Guardar el usuario en la base de datos
  }

  // Actualizar un usuario existente
  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuarios> {
    // Si se quiere actualizar la contraseña, se hace el hash antes de guardar
    if (updateUsuarioDto.contraseña) {
      updateUsuarioDto.contraseña = await bcrypt.hash(updateUsuarioDto.contraseña, 10);
    }
    
    const updatedUsuario = await this.usuariosModel.findByIdAndUpdate(
      id,
      updateUsuarioDto,
      { new: true } // Devuelve el documento actualizado
    ).exec();

    if (!updatedUsuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return updatedUsuario;
  }

  // Buscar un usuario por ID
  async findOne(id: string): Promise<Usuarios> {
    const usuario = await this.usuariosModel.findById(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  // Buscar todos los usuarios
  async findAll(): Promise<Usuarios[]> {
    return this.usuariosModel.find().exec();
  }

  // Eliminar un usuario por ID
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
    
    // Si no es válido, lanzar una excepción
    throw new UnauthorizedException('Credenciales incorrectas');
  }
}
