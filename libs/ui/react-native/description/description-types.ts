import type { TextDefaultProperties } from '@/components/component-types.ts'
import type { ColorProperties } from 'ui/colors'
import type { fontSettings } from '../title/title-settings'

export type DescriptionProperties = Omit<
	TextDefaultProperties,
	'numberOfLines'
> &
	ColorProperties & {
		center?: boolean
		children: string | number | undefined
		defaultSentences?: number
		size?: number
		weight?: keyof typeof fontSettings
	}
