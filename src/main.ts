import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';


async function bootstrap() {

  dotenv.config();
  
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(json({ limit: '50mb' }));

  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.setGlobalPrefix('MyFitGuide');
  
  await app.listen(3000);
  
}

bootstrap();