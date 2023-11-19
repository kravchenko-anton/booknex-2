import type { PressableDefaultProperties } from '@/types/component-types'

export interface RainbowBookCardProperties extends PressableDefaultProperties {
	backgroundColor: string,
	description: string,
	image: {
		uri: string
	},
	title: string
}
