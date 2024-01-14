import type { PressableDefaultProperties } from '@/components/component-types'
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
