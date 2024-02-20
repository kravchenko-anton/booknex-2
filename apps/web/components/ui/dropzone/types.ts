import type { ClampPaletteType } from 'global/colors'
import type { SizeProperties } from 'global/types'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { DefaultInputProperties } from '../base-components-types'

export interface DropzoneProperties
	extends DefaultInputProperties,
		SizeProperties {
	accept?: 'image/*' | '.epub' | '*'
	variant?: ClampPaletteType
	disabled?: boolean
	multiple?: boolean
	onFileDelete?: (file: File, index: number) => void
	onDropFile: (files: File[]) => void
	defaultFiles?: File[]
}

export interface FormDropZoneProperties<T extends FieldValues>
	extends DefaultInputProperties,
		Pick<
			DropzoneProperties,
			| 'size'
			| 'variant'
			| 'multiple'
			| 'accept'
			| 'disabled'
			| 'onFileDelete'
			| 'onDropFile'
			| 'defaultFiles'
		> {
	control: Control<T>
	name: FieldPath<T>
}
