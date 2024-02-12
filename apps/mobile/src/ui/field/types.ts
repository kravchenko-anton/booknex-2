import type { ClampPaletteType } from 'global/colors'
import type { FC } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { KeyboardTypeOptions, TextInputProps } from 'react-native'
import type { SvgProps } from 'react-native-svg'

export interface FieldProperties<T extends FieldValues>
	extends Omit<
		TextInputProps,
		'onChange' | 'onChangeText' | 'value' | 'testID'
	> {
	isArea?: boolean
	control: Control<T>
	icon?: FC<SvgProps>
	keyboardType?: KeyboardTypeOptions
	variant?: ClampPaletteType
	name: FieldPath<T>
}