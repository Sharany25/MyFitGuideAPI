import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { CreateFavoritoComidaDto } from './dto/create-favorito.dto';
import { CreateFavoritoEjercicioDto } from './dto/create-favorito.dto';
import { RemoveFavoritoComidaDto } from './dto/remove-favorito.dto';
import { RemoveFavoritoEjercicioDto } from './dto/remove-favorito.dto';

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Post('ejercicio')
  agregarEjercicio(@Body() dto: CreateFavoritoEjercicioDto) {
    return this.favoritosService.agregarEjercicioFavorito(dto);
  }

  @Delete('ejercicio')
  eliminarEjercicio(@Body() dto: RemoveFavoritoEjercicioDto) {
    return this.favoritosService.eliminarEjercicioFavorito(dto);
  }

  @Post('comida')
  async agregarComidaFavorita(@Body() dto: CreateFavoritoComidaDto) {
    return this.favoritosService.agregarComidaFavorita(dto);
  }

  @Delete('comida')
  eliminarComida(@Body() dto: RemoveFavoritoComidaDto) {
    return this.favoritosService.eliminarComidaFavorita(dto);
  }

  @Get(':userId')
  async obtener(@Param('userId') userId: string) {
    const favoritos = await this.favoritosService.obtenerFavoritos(userId);
    return favoritos;
  }
}
