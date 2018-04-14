import * as jwt from 'jsonwebtoken';
import {
	Component,
	BadRequestException,
} from '@nestjs/common';

import {
	ConfigService,
} from '@bashleigh/nest-config';

import {
	UserEntity as User,
} from './entities';
import UserService from './user.service';

import {
	AuthModel as Auth,
} from './models';

@Component()
export default class AuthService {
	constructor(
		private readonly config: ConfigService,
		private readonly userService: UserService,
	) {
		if (!this.config.has('JWT_SECRET')) throw 'Please add JWT_SECRET to .env';
	}

	createToken(user: User): object {
		const expiresIn = 60 * 60;
		const verifier = { email: user.email };

		const token = jwt.sign(verifier, this.config.get('JWT_SECRET'), { expiresIn });
		return {
			expires_in: expiresIn,
			access_token: token,
		};
	}

	async auth(auth: Auth): Promise<object> {
		const user = await this.userService.findByEmail(auth.email);

		if (!user) throw new BadRequestException('Invalid credentials');

		const valid = this.userService.compareHash(auth.password, user.password);

		if (!valid) throw new BadRequestException('Invalid credentials');

		return this.createToken(user);
	}

	async validateUser(payload): Promise<User|boolean> {

		if (!payload.hasOwnProperty('email')) return false;

		return await this.userService.findByEmail(payload.email);

	}
}