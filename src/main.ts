import {
  NestFactory,
} from '@nestjs/core';
import AppModule from './app.module';
import * as path from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.static(path.join(__dirname, '/../public')));
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'jade');

  await app.listen(3000);
}

bootstrap();
