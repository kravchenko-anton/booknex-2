import type { ComponentType, ReactElement, ReactNode } from 'react'
import type {
	FieldErrors,
	FieldName,
	Message,
	MultipleFieldErrors
} from 'react-hook-form'
import { JSX } from 'react/jsx-runtime'
import IntrinsicElements = JSX.IntrinsicElements

type Assign<T extends object, UType extends object> = T & Omit<UType, keyof T>

export type FieldValuesFromFieldErrors<TFieldErrorsType> =
	TFieldErrorsType extends FieldErrors<infer TFieldValues>
		? TFieldValues
		: never

type AsProperties<TAsType> = TAsType extends null
	? NonNullable<unknown>
	: TAsType extends ReactElement
		? Record<string, never>
		: TAsType extends ComponentType<infer P>
			? Omit<P, 'children'>
			: TAsType extends keyof JSX.IntrinsicElements
				? IntrinsicElements[TAsType]
				: never

export type Properties<
	TFieldErrorsType extends FieldErrors,
	TAsType extends
		| null
		| ReactElement
		| ComponentType<never>
		| keyof JSX.IntrinsicElements
> = Assign<
	{
		as?: TAsType
		errors?: TFieldErrorsType
		name: FieldName<FieldValuesFromFieldErrors<TFieldErrorsType>>
		message?: Message
		render?: (data: {
			message: Message
			messages?: MultipleFieldErrors
		}) => ReactNode
	},
	AsProperties<TAsType>
>
