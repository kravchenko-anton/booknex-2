import type { TextDefaultProperties } from '@/components/component-types'
import type { fontSettings } from '@/components/ui/title/title-settings'
import type { ColorProperties } from '@/ui/colors'

export type TitleProperties = TextDefaultProperties &
	ColorProperties & {
		center?: boolean
		children: string | number | undefined | string[]
		size?: number
		weight?: keyof typeof fontSettings
	}
