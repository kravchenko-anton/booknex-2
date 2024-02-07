import type { PressableDefaultProperties } from '@/types/component-types'
import type { SizeProperties } from 'global/types'

export interface BookCardProperties
	extends PressableDefaultProperties,
		SizeProperties {
	title?: string
	author?: string
	image: {
		uri: string
	}
}
