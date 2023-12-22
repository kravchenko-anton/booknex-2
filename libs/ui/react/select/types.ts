import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface FormSelectProperties<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
}
