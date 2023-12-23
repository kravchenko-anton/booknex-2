import type { PressableDefaultProperties } from '@/components/component-types'

export interface BookCardProperties extends PressableDefaultProperties {
	author?: string
	image: {
		size: 'sm' | 'md' | 'lg'
		uri: string
	}
	pages?: number
	title?: string
}
