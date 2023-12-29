import type { DropzoneProperties } from './types'

export const settings: {
	colors: Record<DropzoneProperties['variant'], string>
	padding: Record<DropzoneProperties['size'], string>
	maxWidth: Record<DropzoneProperties['size'], string>
} = {
	colors: {
		gray: 'border-gray  hover:border-vibrant',
		foreground: 'border-foreground  hover:border-vibrant',
		vibrant: 'border-vibrant  hover:border-foreground',
		shade: 'border-shade  hover:border-foreground',
		background: 'border-background  hover:border-vibrant'
	},
	padding: {
		sm: 'p-4',
		md: 'p-8',
		lg: 'p-12'
	},
	maxWidth: {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg'
	}
}
