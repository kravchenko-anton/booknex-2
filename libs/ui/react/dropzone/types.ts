import type { HTMLAttributes } from 'react'
import type { File } from '../../../global/icons/react'
import type { Color } from '../../colors'

export interface DropzoneProperties extends HTMLAttributes<HTMLDivElement> {
	size?: 'sm' | 'md' | 'lg'
	accept?: 'image/*' | '.epub' | '*'
	color?: keyof Pick<
		typeof Color,
		'gray' | 'foreground' | 'vibrant' | 'shade' | 'background'
	>
	disabled?: boolean
	multiple?: boolean
	onFileDelete?: (file: File) => void
	onDropFile: (files: File[]) => void
	defaultFiles?: File[]
}
