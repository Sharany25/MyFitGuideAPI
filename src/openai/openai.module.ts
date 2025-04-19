import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DietaAI, DietaAISchema } from './schema/dieta-ai.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DietaAI.name, schema: DietaAISchema }])
  ],
  controllers: [OpenaiController],
  providers: [OpenaiService],
})
export class OpenaiModule {}
