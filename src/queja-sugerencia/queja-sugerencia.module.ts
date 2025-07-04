import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuejaSugerenciaService } from './queja-sugerencia.service';
import { QuejaSugerenciaController } from './queja-sugerencia.controller';
import { QuejaSugerencia, QuejaSugerenciaSchema } from './schema/queja-sugerencia.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuejaSugerencia.name, schema: QuejaSugerenciaSchema }
    ]),
  ],
  controllers: [QuejaSugerenciaController],
  providers: [QuejaSugerenciaService],
})
export class QuejaSugerenciaModule {}
