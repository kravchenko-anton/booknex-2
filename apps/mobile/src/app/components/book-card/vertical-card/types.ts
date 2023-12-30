import type { PressableDefaultProperties } from '@/components/component-types'
import type { SizeType } from '@/types/global'
import type { LineColorType } from 'ui/colors'

export interface VerticalBookCardProperties extends PressableDefaultProperties {
	buttons?: {
		label: string
		onPress?: () => void
		backgroundColor?: LineColorType
		color?: LineColorType
	}[]
	size: SizeType
	description?: string
	descriptionLines?: number
	image: {
		uri: string
	}
	title: string
}
