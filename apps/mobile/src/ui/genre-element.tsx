import type { PressableDefaultProperties } from '@/types/component-types'
import { settings } from '@/ui/button/settings'
import { AnimatedPress } from '@/ui/index'
import Title from '@/ui/title/title'
import { cn } from '@/utils'
import { getFileUrl } from 'global/api-config'
import { InnerColor } from 'global/colors'
import { SvgUri } from 'react-native-svg'

interface GenreElementProperties extends PressableDefaultProperties {
	svgUri: string
	title: string
	size?: 'sm' | 'md' | 'lg'
}

export const GenreElement = ({
	svgUri,
	title,
	size = 'md',
	...rest
}: GenreElementProperties) => (
	<AnimatedPress
		className={cn(
			'flex-row items-center justify-center rounded-md',
			settings.padding[size],
			settings.colors.muted
		)}
		{...rest}>
		<Title
			weight='semiBold'
			color={InnerColor.muted}
			size={settings.titleSize[size]}>
			{title}
		</Title>
		<SvgUri
			uri={getFileUrl(svgUri)}
			className='ml-2'
			color={InnerColor.muted}
			width={settings.iconSize[size]}
			height={settings.iconSize[size]}
		/>
	</AnimatedPress>
)
