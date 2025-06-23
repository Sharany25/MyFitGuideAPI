import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { RemoveFavoritoDto } from './dto/remove-favorito.dto';

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Post()
  agregar(@Body() dto: CreateFavoritoDto) {
    return this.favoritosService.agregarFavorito(dto);
  }

  @Delete()
  eliminar(@Body() dto: RemoveFavoritoDto) {
    return this.favoritosService.eliminarFavorito(dto);
  }

  @Get(':userId')
  obtener(@Param('userId') userId: string) {
    return this.favoritosService.obtenerFavoritos(userId);
  }
}
