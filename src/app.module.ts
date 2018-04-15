import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import {
  ConfigService,
} from '@bashleigh/nest-config';

import {
  TypeOrmModule,
} from '@nestjs/typeorm';
import {
  Connection,
} from 'typeorm';

import AuthModule from './auth.module';
import GroupModule from './group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigService,
    AuthModule,
    GroupModule,
  ],
  controllers: [
    AppController,
  ],
  components: [
  ],
})
export default class AppModule {
  constructor(private readonly connection: Connection) {}
}