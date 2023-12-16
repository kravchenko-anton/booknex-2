import type { TextDefaultProperties } from '@/components/component-types'
import type { fontSettings } from '@/components/ui/title/title-settings'
import type { ColorProperties } from 'ui/colors'

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
