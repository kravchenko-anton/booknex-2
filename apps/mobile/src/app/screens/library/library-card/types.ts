import type { PressableDefaultProperties } from '@/components/component-types'
import type { IconProperties } from '@/types/global'

export interface LibraryListElementType
	extends IconProperties,
		PressableDefaultProperties {
	count: number
	name: string
}
