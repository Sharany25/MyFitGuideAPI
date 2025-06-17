import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DietaiaService } from './dietaia.service';
import { DietaiaController } from './dietaia.controller';
import { Dietaia, DietaiaSchema } from './schemas/dietaia.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dietaia.name, schema: DietaiaSchema }]),
  ],
  controllers: [DietaiaController],
  providers: [DietaiaService],
})
export class DietaiaModule {}
