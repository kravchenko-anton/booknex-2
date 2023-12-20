import type { Style } from '@/types.ts/global'
import type { Control, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form'
import type { KeyboardTypeOptions, TextInputProps } from 'react-native'
import type { Color } from 'ui/colors'

export interface FieldProperties<T extends FieldValues>
	extends Omit<
		TextInputProps,
		'onChange' | 'onChangeText' | 'value' | 'testID'
	> {
	control: Control<T>
	keyboardType?: KeyboardTypeOptions
	wrapperStyle?: Style
	variant?: keyof Omit<
		typeof Color,
		'background' | 'black' | 'white' | 'transparent'
	>
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