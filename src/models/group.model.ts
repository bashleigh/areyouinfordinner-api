import {
	MinLength,
} from 'class-validator';

export default class GroupModel {

	@MinLength
	readonly name;
}