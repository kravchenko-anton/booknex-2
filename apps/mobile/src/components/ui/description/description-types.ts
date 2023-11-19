import type { fontSettings } from '@/components/ui/title/title-settings'
import type { TextDefaultProperties } from '@/types/component-types'
import type { ColorProperties } from '@/utils/color'

export type DescriptionProperties = Omit<
	TextDefaultProperties,
	'numberOfLines'
> &
	ColorProperties & {
		center?: boolean,
		children: string | number | undefined,
		defaultSentences?: number,
		size?: number,
		weight?: keyof typeof fontSettings
	}
