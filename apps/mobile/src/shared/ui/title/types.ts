import type { TextDefaultProperties } from '@/shared/types/component-types'
import type { ColorProperties } from 'global/colors'
import type { fontSettings } from './settings'

export type TitleProperties = TextDefaultProperties &
	ColorProperties & {
		center?: boolean
		children: string | number | null | string[]
		size?: number
		weight?: keyof typeof fontSettings
	}
