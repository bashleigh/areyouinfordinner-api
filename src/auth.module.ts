import {
	Module,
} from '@nestjs/common';
import AuthController from './auth.controller';
import UserService from './user.service';
import AuthService from './auth.service';
import JwtStrategy from './jwt.strategy';

import {
	UserEntity,
} from './entities';
import ConfigModule from '@bashleigh/nest-config';

import {
	TypeOrmModule,
} from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserEntity,
		]),
		ConfigModule,
	],
	controllers: [
		AuthController,
	],
	components: [
		UserService,
		AuthService,
		JwtStrategy,
	],
})
export default class AuthModule {
}