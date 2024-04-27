import { settings } from '@/components/ui/button/settings'
import { cn } from '@/utils'
import { getFileUrl } from 'global/api-config'
import { InnerColor } from 'global/colors'
import Image from 'next/image'
import type { FC } from 'react'

interface GenreElementProperties {
	svgUri: string
	title: string
	onClick?: () => void
}
const GenreElement: FC<GenreElementProperties> = ({
	svgUri,
	onClick,
	title
}) => (
	<button
		className={cn(
			'mb-1 flex cursor-pointer items-center justify-center gap-2 rounded px-3 py-1.5 font-bold duration-200 ease-linear',
			settings.size.sm,
			settings.colors.muted
		)}
		onClick={onClick}>
		<span className='whitespace-nowrap text-lg text-gray-500'>{title}</span>

		<Image
			alt={title}
			src={getFileUrl(svgUri)}
			color={InnerColor.muted}
			width={settings.iconSize.sm}
			height={settings.iconSize.sm}
		/>
	</button>
)

export default GenreElement
