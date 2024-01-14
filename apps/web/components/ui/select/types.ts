import type { ComponentProps } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type ReactAsyncSelect from 'react-select/async'

export interface FormSelectProperties<T extends FieldValues>
	extends Omit<ComponentProps<typeof ReactAsyncSelect>, 'styles'> {
	control: Control<T>
	name: FieldPath<T>
}
