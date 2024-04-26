import { settings } from '@/ui/button/settings'
import { AnimatedPress } from '@/ui/index'
import Title from '@/ui/title/title'
import { cn } from '@/utils'
import { InnerColor } from 'global/colors'
import { SvgUri } from 'react-native-svg'

interface GenreElementProperties {
	svgUri: string
	title: string
	onPress?: () => void
}

export const GenreElement = ({
	onPress,
	svgUri,
	title
}: GenreElementProperties) => (
	<AnimatedPress
		className={cn(
			'flex-row items-center justify-center rounded-md',
			settings.padding.md,

			settings.colors.muted
		)}
		onPress={onPress}>
		<SvgUri
			uri={svgUri}
			className='mr-2 mt-1'
			color={InnerColor.muted}
			width={settings.iconSize.md}
			height={settings.iconSize.md}
		/>

		<Title
			weight='semiBold'
			color={InnerColor.muted}
			size={settings.titleSize.md}>
			{title}
		</Title>
	</AnimatedPress>
)
