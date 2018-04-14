import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import AuthController from './auth.controller';
import UserService from './user.service';
import AuthService from './auth.service';
import JwtService from './jwt.service';

import * as Entities from './entities';
import {
  ConfigService,
} from '@bashleigh/nest-config';

import {
  TypeOrmModule,
} from '@nestjs/typeorm';
import {
  Connection,
} from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(Entities),
    ConfigService,
  ],
  controllers: [
    AppController,
    AuthController,
  ],
  components: [
    AuthService,
    UserService,
    JwtService,
  ],
})
export default class AppModule {
  constructor(private readonly connection: Connection) {}
}