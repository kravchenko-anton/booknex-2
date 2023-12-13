import type { PressableDefaultProperties } from '@/components/component-types'

export interface BookCardProperties extends PressableDefaultProperties {
	author?: string
	image: {
		size: 'small' | 'medium' | 'large'
		uri: string
	}
	likedPercentage?: number
	pages?: number
	title?: string
}
