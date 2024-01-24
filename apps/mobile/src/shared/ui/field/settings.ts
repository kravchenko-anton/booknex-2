import type { FieldProperties } from './types'

export const settings: {
	colors: Record<FieldProperties<never>['variant'], string>
} = {
	colors: {
		foreground: 'bg-foreground border-[1px] border-muted',
		muted: 'bg-muted border-[1px] border-foreground',
		background: 'bg-background border-[1px] border-foreground'
	}
}
