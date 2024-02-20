import type { TitleSizeType } from '@/ui/title/types'
import type { ButtonProperties } from './types'

export const settings: {
	colors: Record<Required<ButtonProperties>['variant'], string>
	titleSize: Record<ButtonProperties['size'], TitleSizeType>
	padding: Record<ButtonProperties['size'], string>
	iconSize: Record<ButtonProperties['size'], number>
} = {
	colors: {
		foreground: 'bg-foreground border-[1px] border-muted',
		muted: 'bg-muted border-[1px] border-foreground',
		primary: 'bg-primary border-[1px] border-transparent',
		danger: 'bg-danger border-[1px] border-transparent',
		background: 'bg-background border-[1px] border-transparent',
		success: 'bg-success border-[1px] border-transparent',
		warning: 'bg-warning border-[1px] border-transparent'
	},
	iconSize: {
		sm: 16,
		md: 22,
		lg: 36
	},
	titleSize: {
		sm: 'sm',
		md: 'lg',
		lg: 'xxl'
	},
	padding: {
		sm: 'py-1 px-2.5',
		md: 'py-1.5 px-3',
		lg: 'py-2 px-4'
	}
}
