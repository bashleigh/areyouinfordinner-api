import {
	IsEmail,
	Length,
	IsBoolean,
	MinLength,
} from 'class-validator';

export default class UserModel {

	readonly id: string;

	@Length(2, 20)
	readonly firstname: string;

	@Length(2, 20)
	readonly lastname: string;

	@IsBoolean()
	readonly active: boolean = true;

	@IsEmail()
	readonly email: string;

	@MinLength(8)
	readonly password: string;

}