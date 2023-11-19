import type { fontSettings } from '@/components/ui/title/title-settings'
import type { TextDefaultProperties } from '@/types/component-types'
import type { ColorProperties } from '@/utils/color'

export type TitleProperties = TextDefaultProperties &
	ColorProperties & {
		center?: boolean
		children: string | number | undefined | string[]
		size?: number
		weight?: keyof typeof fontSettings
	}
