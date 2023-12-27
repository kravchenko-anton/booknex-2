import type { PressableDefaultProperties } from '@/components/component-types'

export interface BookCardProperties extends PressableDefaultProperties {
	author?: string
	size: 'sm' | 'md' | 'lg'
	image: {
		uri: string
	}
	pages?: number
	title?: string
}
