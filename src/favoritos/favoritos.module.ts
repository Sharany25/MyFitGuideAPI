import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritosController } from './favoritos.controller';
import { FavoritosService } from './favoritos.service';
import { Favorito, FavoritoSchema } from './schemas/favorito.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Favorito.name, schema: FavoritoSchema }])],
  controllers: [FavoritosController],
  providers: [FavoritosService],
})
export class FavoritosModule {}
