import type { TextDefaultProperties } from '../../../../apps/mobile/src/app/components/component-types'
import type { ColorProperties } from '../../colors'
import type { fontSettings } from './settings'

export type TitleProperties = TextDefaultProperties &
	ColorProperties & {
		center?: boolean
		children: string | number | undefined | string[]
		size?: number
		weight?: keyof typeof fontSettings
	}
