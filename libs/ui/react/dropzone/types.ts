import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import type { File } from '../../../global/icons/react'
import type { ClampPaletteType } from '../../colors'
import type { DefaultInputProperties } from '../components-props-types'

export interface DropzoneProperties extends DefaultInputProperties {
	size?: 'sm' | 'md' | 'lg'
	accept?: 'image/*' | '.epub' | '*'
	variant?: ClampPaletteType
	disabled?: boolean
	multiple?: boolean
	onFileDelete?: (file: File) => void
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
