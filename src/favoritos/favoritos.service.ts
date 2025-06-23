import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorito } from './schemas/favorito.schema';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { RemoveFavoritoDto } from './dto/remove-favorito.dto';

@Injectable()
export class FavoritosService {
  constructor(@InjectModel(Favorito.name) private favoritoModel: Model<Favorito>) {}

  async agregarFavorito(dto: CreateFavoritoDto) {
    const favorito = await this.favoritoModel.findOne({ userId: dto.userId });
    if (!favorito) {
      return this.favoritoModel.create({ userId: dto.userId, ejercicios: [dto.ejercicio] });
    }

    if (!favorito.ejercicios.includes(dto.ejercicio)) {
      favorito.ejercicios.push(dto.ejercicio);
      await favorito.save();
    }

    return favorito;
  }

  async eliminarFavorito(dto: RemoveFavoritoDto) {
    const favorito = await this.favoritoModel.findOne({ userId: dto.userId });
    if (!favorito) return null;

    favorito.ejercicios = favorito.ejercicios.filter(e => e !== dto.ejercicio);
    await favorito.save();

    return favorito;
  }

  async obtenerFavoritos(userId: string) {
    const favorito = await this.favoritoModel.findOne({ userId });
    return favorito?.ejercicios || [];
  }
}
