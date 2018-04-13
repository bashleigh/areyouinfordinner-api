import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  TypeOrmModule,
} from '@nestjs/typeorm';
import {
  Connection,
} from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  components: [],
})
export default class AppnModule {
  constructor(private readonly connection: Connection) {}
}