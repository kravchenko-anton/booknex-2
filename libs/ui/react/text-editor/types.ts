import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { ClampPaletteType } from '../../colors'
import type { DefaultTextAreaProperties } from '../components-props-types'

export interface FormTextEditorProperties<T extends FieldValues>
	extends TextAreaProperties {
	control: Control<T>
	name: FieldPath<T>
}

export interface TextAreaProperties extends DefaultTextAreaProperties {
	variant?: ClampPaletteType
}
