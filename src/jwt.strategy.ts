import {
	ExtractJwt,
	Strategy,
} from 'passport-jwt';
import * as passport from 'passport';
import {
	Component,
	Inject,
} from '@nestjs/common';
import AuthService from './auth.service';

import {
	ConfigService,
} from '@bashleigh/nest-config';

@Component()
export default class JwtStrategy extends Strategy {
	constructor(
		private readonly authService: AuthService,
		private readonly config: ConfigService,
	) {
		super(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				passReqToCallback: true,
				secretOrKey: config.get('JWT_SECRET'),
			},
			async (req, payload, next) => await this.verify(req, payload, next)
		);
		passport.use(this);
	}

	public async verify(request, payload, done) {
		const user = await this.authService.validateUser(payload);
		if (!user) {
			return done('Unauthorized', false);
		}
		done(null, user);
	}
}