import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorito } from './schemas/favorito.schema';
import { CreateFavoritoEjercicioDto } from './dto/create-favorito.dto';
import { CreateFavoritoComidaDto } from './dto/create-favorito.dto';
import { RemoveFavoritoEjercicioDto } from './dto/remove-favorito.dto';
import { RemoveFavoritoComidaDto } from './dto/remove-favorito.dto';

@Injectable()
export class FavoritosService {
  constructor(@InjectModel(Favorito.name) private favoritoModel: Model<Favorito>) {}

  // Agregar ejercicio a favoritos
  async agregarEjercicioFavorito(dto: CreateFavoritoEjercicioDto) {
    const favorito = await this.favoritoModel.findOne({ userId: dto.userId });
    if (!favorito) {
      return this.favoritoModel.create({ userId: dto.userId, ejercicios: [dto.ejercicio], comidas: [] });
    }

    if (!favorito.ejercicios.includes(dto.ejercicio)) {
      favorito.ejercicios.push(dto.ejercicio);
      await favorito.save();
    }

    return favorito;
  }

  // Eliminar ejercicio de favoritos
  async eliminarEjercicioFavorito(dto: RemoveFavoritoEjercicioDto) {
    const favorito = await this.favoritoModel.findOne({ userId: dto.userId });
    if (!favorito) return null;

    favorito.ejercicios = favorito.ejercicios.filter(e => e !== dto.ejercicio);
    await favorito.save();

    return favorito;
  }

  // Agregar comida a favoritos
  async agregarComidaFavorita(dto: CreateFavoritoComidaDto) {
    const favorito = await this.favoritoModel.findOne({ userId: dto.userId });
    if (!favorito) {
      return this.favoritoModel.create({ userId: dto.userId, ejercicios: [], comidas: [dto.comida] });
    }

    if (!favorito.comidas.includes(dto.comida)) {
      favorito.comidas.push(dto.comida);
      await favorito.save();
    }

    return favorito;
  }

  // Eliminar comida de favoritos
  async eliminarComidaFavorita(dto: RemoveFavoritoComidaDto) {
    const favorito = await this.favoritoModel.findOne({ userId: dto.userId });
    if (!favorito) return null;

    favorito.comidas = favorito.comidas.filter(c => c !== dto.comida);
    await favorito.save();

    return favorito;
  }

  // Obtener favoritos de un usuario
  async obtenerFavoritos(userId: string) {
    const favorito = await this.favoritoModel.findOne({ userId });
    return {
      ejercicios: favorito?.ejercicios || [],
      comidas: favorito?.comidas || []
    };
  }
}
