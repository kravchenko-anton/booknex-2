import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export type SizeType = 'sm' | 'md' | 'lg'

export interface SizeProperties {
	size: SizeType
}

export type FunctionType = () => void

export interface BaseFieldProperties<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
}
