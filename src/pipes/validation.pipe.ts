import {
	PipeTransform,
	Pipe,
	ArgumentMetadata,
	BadRequestException,
} from '@nestjs/common';

import {
	validate,
	ValidationError,
} from 'class-validator';

import {
	plainToClass,
} from 'class-transformer';

@Pipe()
export default class ValidationPipe implements PipeTransform<any> {

	async transform(value, metadata: ArgumentMetadata) {
		const {metatype} = metadata;

		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToClass(metatype, value);

		const errors = await validate(object);
		if (errors.length > 0) {

			// TODO custom exception for return errors: []
			throw new BadRequestException({
				message: 'Validation failed',
				errors: this.buildErrorResponse(errors),
			});
		}
		return value;
	}

	private toValidate(metatype): boolean {
		const types = [String, Boolean, Number, Array, Object];
		return !types.find((type) => metatype === type);
	}

	private buildErrorResponse(errors : ValidationError[]) {
		return errors.map((error) => ({[error.property]: error.constraints}));
	}
}