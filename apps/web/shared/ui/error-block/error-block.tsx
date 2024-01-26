import type { FieldErrors } from 'react-hook-form'
import { get, useFormContext } from 'react-hook-form'
import type { Properties } from './types'

export const ErrorMessage = <TFieldErrorsType extends FieldErrors>({
	errors,
	name,
	message
}: Properties<TFieldErrorsType>) => {
	const methods = useFormContext()
	const error = get(errors || methods.formState.errors, name)

	if (!error) {
		return null
	}

	return <p className='text-danger text-md mt-2 italic'>{message}</p>
}
