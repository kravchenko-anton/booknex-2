import type { ComponentType, ReactElement } from 'react'
import type { FieldErrors, Message } from 'react-hook-form'
import { JSX } from 'react/jsx-runtime'
import IntrinsicElements = JSX.IntrinsicElements

type Assign<T extends object, K extends object> = T & Omit<K, keyof T>

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

export type Properties<TFieldErrorsType extends FieldErrors> = Assign<
	{
		errors?: TFieldErrorsType
		name: string
		message?: Message
	},
	AsProperties<null>
>
