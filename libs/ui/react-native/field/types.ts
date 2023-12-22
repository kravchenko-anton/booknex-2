import type {
	Control,
	FieldPath,
	FieldValues,
	RegisterOptions
} from 'react-hook-form'
import type { KeyboardTypeOptions, TextInputProps } from 'react-native'
import type { ClampPaletteType } from '../../colors'

export interface FieldProperties<T extends FieldValues>
	extends Omit<
		TextInputProps,
		'onChange' | 'onChangeText' | 'value' | 'testID'
	> {
	control: Control<T>
	keyboardType?: KeyboardTypeOptions
	variant?: ClampPaletteType
	backgroundColor?: string
	borderColor?: string
	color?: string
	name: FieldPath<T>
	rules?: Omit<
		RegisterOptions<T, FieldPath<T>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>
}
