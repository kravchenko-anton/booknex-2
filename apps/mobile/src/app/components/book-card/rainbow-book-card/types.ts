import type { PressableDefaultProperties } from '@/components/component-types'

export interface RainbowBookCardProperties extends PressableDefaultProperties {
	backgroundColor: string
	description: string
	image: {
		uri: string
	}
	title: string
}
