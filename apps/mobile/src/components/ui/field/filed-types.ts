import type { Style } from '@/types/global'
import type {
	Control,
	FieldPath,
	FieldValues,
	RegisterOptions
} from 'react-hook-form'
import type { KeyboardTypeOptions, TextInputProps } from 'react-native'

export interface FieldProperties<T extends FieldValues>
	extends Omit<
		TextInputProps,
		'onChange' | 'onChangeText' | 'value' | 'testID'
	> {
	control: Control<T>
	keyboardType?: KeyboardTypeOptions
	wrapperStyle?: Style
	backgroundColor?: string
	borderColor?: string
	color?: string
	wrapperClassName?: string
	name: FieldPath<T>
	rules?: Omit<
		RegisterOptions<T, FieldPath<T>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>
}
