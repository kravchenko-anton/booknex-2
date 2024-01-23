import type { DropzoneProperties } from './types'

export const settings: {
	colors: Record<DropzoneProperties['variant'], string>
	padding: Record<DropzoneProperties['size'], string>
	maxWidth: Record<DropzoneProperties['size'], string>
} = {
	colors: {
		foreground: 'border-foreground  hover:border-muted',
		muted: 'border-muted  hover:border-foreground',
		background: 'border-background  hover:border-muted'
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
