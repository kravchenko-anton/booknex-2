import type { ClampPaletteType } from 'global/colors'
import { BaseFieldProperties } from 'global/types'
import type { FieldValues } from 'react-hook-form'
import type { DefaultTextAreaProperties } from '../base-components-types'

export interface FormTextEditorProperties<T extends FieldValues>
	extends TextAreaProperties,
		BaseFieldProperties<T> {}

export interface TextAreaProperties extends DefaultTextAreaProperties {
	variant?: ClampPaletteType
}
