import type { TextDefaultProperties } from '@/types/component-types'
import type { ColorProperties } from 'global/colors'
import type { fontSettings } from './settings'

export type TitleProperties = TextDefaultProperties &
	ColorProperties & {
		center?: boolean
		children: any
		size?: number
		weight?: keyof typeof fontSettings
	}
