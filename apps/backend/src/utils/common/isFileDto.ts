import {
	registerDecorator,
	type ValidationArguments,
	type ValidationOptions
} from 'class-validator'

interface IsFileOptionsType {
	mime: ('image/jpg' | 'image/png' | 'image/jpeg')[]
}

export function IsFile(
	options: IsFileOptionsType,
	validationOptions?: ValidationOptions
) {
	return function (object: NonNullable<unknown>, propertyName: string) {
		return registerDecorator({
			name: 'isFile',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				validate(value: any, _skip: ValidationArguments) {
					return (
						value?.mimetype && (options?.mime ?? []).includes(value?.mimetype)
					)
				}
			}
		})
	}
}
