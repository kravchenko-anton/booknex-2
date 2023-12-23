import type { PressableDefaultProperties } from '@/components/component-types'
import type { LineColorType } from 'ui/colors'

export interface VerticalBookCardProperties extends PressableDefaultProperties {
	buttons?: {
		label: string
		onPress?: () => void
		backgroundColor?: LineColorType
		color?: LineColorType
	}[]

	description?: string
	descriptionLines?: number
	image: {
		size: 'sm' | 'md' | 'lg' | 'cube'
		uri: string
	}
	title: string
}
