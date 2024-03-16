import { Icon, Title } from '@/ui'
import { Color } from 'global/colors'
import type { FC } from 'react'
import { View } from 'react-native'

interface StatisticItemProperties {
	title: string
	icon: FC
	count: number | string
}

export const StatisticItem: FC<StatisticItemProperties> = ({
	title,
	icon,
	count
}) => (
	<View className=' items-center text-center'>
		<Icon
			stroke={Color.gray}
			className='rounded-full'
			icon={icon}
			size={'lg'}
			variant='muted'
		/>
		<View className='mt-2  items-center text-center'>
			<Title size={'md'} weight='semiBold' color={Color.white}>
				{String(count)}
			</Title>
			<Title size={'sm'} color={Color.gray}>
				{title}
			</Title>
		</View>
	</View>
)
