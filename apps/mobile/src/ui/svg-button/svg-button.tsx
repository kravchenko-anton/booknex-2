import { storage } from '@/App'
import { AnimatedPress } from '@/ui'
import { settings } from '@/ui/button/settings'
import type { ButtonProperties } from '@/ui/button/types'
import { storedSvgPath, useSvgIcon } from '@/ui/svg-button/useSvgIcon'
import Title from '@/ui/title/title'
import { cn } from '@/utils'
import { InnerColor } from 'global/colors'
import { Text } from 'react-native'
import { SvgXml } from 'react-native-svg'

interface SvgButtonProperties extends Omit<ButtonProperties, 'isLoading'> {
	svgUri: string
	title: string
	altEmoji: string
}

export const SvgButton = ({
	svgUri,
	title,
	size = 'md',
	altEmoji = '',
	variant = 'muted',
	...rest
}: SvgButtonProperties) => {
	const svgContent = useSvgIcon(svgUri, altEmoji)
	return (
		<AnimatedPress
			className={cn(
				'flex-row items-center justify-center rounded-lg',
				settings.padding[size],
				settings.colors[variant]
			)}
			{...rest}>
			<Title
				weight='semiBold'
				color={InnerColor[variant]}
				size={settings.titleSize[size]}>
				{title}
			</Title>
			{svgContent?.type === 'svg' ? (
				<SvgXml
					xml={svgContent.content.toString()}
					className='ml-2 mt-0.5'
					width={settings.iconSize[size]}
					height={settings.iconSize[size]}
					onError={() => storage.delete(storedSvgPath + svgUri)}
				/>
			) : (
				<Text
					className='ml-2 mt-0.5'
					style={{
						fontSize: settings.iconSize[size],
						color: InnerColor[variant]
					}}>
					{altEmoji}
				</Text>
			)}
		</AnimatedPress>
	)
}
