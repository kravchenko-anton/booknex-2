import type { FieldErrors } from 'react-hook-form'
import type { Properties } from './types'

export const ErrorMessage = <TFieldErrorsType extends FieldErrors>({
	errors,
	name
}: Properties<TFieldErrorsType>) => {
	const error = errors[name]?.message

	if (error && typeof error === 'string')
		return <p className='text-danger text-md mt-2 italic'>{error}</p>
}
