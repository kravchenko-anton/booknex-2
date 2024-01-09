import type { ComponentType, ReactElement } from 'react'
import { Fragment, cloneElement, createElement, isValidElement } from 'react'
import type { FieldErrors } from 'react-hook-form'
import { get, useFormContext } from 'react-hook-form'
import type { Properties } from './types'

const ErrorMessage = <
	TFieldErrors extends FieldErrors,
	TAs extends
		| null
		| ReactElement
		| ComponentType<never>
		| keyof JSX.IntrinsicElements = null
>({
	as,
	errors,
	name,
	message,
	render,
	...rest
}: Properties<TFieldErrors, TAs>) => {
	const methods = useFormContext()
	const error = get(errors || methods.formState.errors, name)

	if (!error) {
		return null
	}

	const { message: messageFromRegister, types } = error
	const properties = Object.assign({}, rest, {
		children: messageFromRegister || message
	})

	// eslint-disable-next-line no-nested-ternary
	return isValidElement(as)
		? cloneElement(as, properties)
		: render
			? (render({
					message: messageFromRegister || message,
					messages: types
				}) as ReactElement)
			: createElement((as as string) || Fragment, properties)
}

export { ErrorMessage }
