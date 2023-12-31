import type { PressableDefaultProperties } from '@/components/component-types'
import type { SizeProperties } from '@/types/global'

export interface BookCardProperties
	extends PressableDefaultProperties,
		SizeProperties {
	title?: string
	author?: string
	image: {
		uri: string
	}
}
