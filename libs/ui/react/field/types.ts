import type { FC, SVGProps } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { DefaultInputProperties } from '../components-props-types'
import type { InputColorPaletteType } from './styles'

export interface InputProperties extends DefaultInputProperties {
	placeholder?: string
	isError?: boolean
	icon?: FC<SVGProps<SVGElement>>
	color?: InputColorPaletteType
}

export interface FieldProperties<T extends FieldValues>
	extends InputProperties {
	control: Control<T>
	name: FieldPath<T>
}
