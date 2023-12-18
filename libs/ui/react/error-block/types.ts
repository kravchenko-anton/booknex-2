import type React from 'react'
import type {
	FieldErrors,
	FieldName,
	Message,
	MultipleFieldErrors
} from 'react-hook-form'

type Assign<T extends object, U extends object> = T & Omit<U, keyof T>

export type FieldValuesFromFieldErrors<TFieldErrors> =
	TFieldErrors extends FieldErrors<infer TFieldValues> ? TFieldValues : never

type AsProperties<TAs> = TAs extends undefined
	? NonNullable<unknown>
	: TAs extends React.ReactElement
	  ? Record<string, never>
	  : TAs extends React.ComponentType<infer P>
	    ? Omit<P, 'children'>
	    : TAs extends keyof JSX.IntrinsicElements
	      ? JSX.IntrinsicElements[TAs]
	      : never

export type Properties<
	TFieldErrors extends FieldErrors,
	TAs extends
		| undefined
		| React.ReactElement
		| React.ComponentType<never>
		| keyof JSX.IntrinsicElements
> = Assign<
	{
		as?: TAs
		errors?: TFieldErrors
		name: FieldName<FieldValuesFromFieldErrors<TFieldErrors>>
		message?: Message
		render?: (data: {
			message: Message
			messages?: MultipleFieldErrors
		}) => React.ReactNode
	},
	AsProperties<TAs>
>
