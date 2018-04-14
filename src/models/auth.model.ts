import {
	IsEmail,
	MinLength,
} from 'class-validator';

export default class AuthModel {

	@IsEmail()
	readonly email: string;

	@MinLength(8)
	readonly password: string;
}