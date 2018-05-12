import {
	Controller,
	Post,
	Body,
	Get,
	Req,
	BadRequestException,
} from '@nestjs/common';

import UserService from './user.service';
import AuthService from './auth.service';

import {
	AuthModel as Auth,
	UserModel,
} from './models';

import {
	UserEntity as User,
} from './entities';

import {
	ValidationPipe,
} from './pipes';

@Controller('auth')
export default class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
	) {}

	@Post('login')
	async login(@Body(new ValidationPipe()) body: Auth): Promise<object> {
		return await this.authService.auth(body);
	}

	@Post('register')
	async register(@Body(new ValidationPipe()) body: UserModel): Promise<object> {

		if (await this.userService.findByEmail(body.email)) {
			throw new BadRequestException({
				error: 'duplicate entry',
			});
		}

		const user = await this.userService.create(body);

		const token = this.authService.createToken(user);

		return {
			user: user,
			token: token,
		};
	}

	@Get('me')
	me(@Req() request): User {
		return request.user;
	}
}