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
	<View className='flex-row items-center'>
		<Icon stroke={Color.gray} icon={icon} size={'sm'} variant='transparent' />
		<View>
			<Title size={'md'} weight='bold' color={Color.gray}>
				{String(count)} {title}
			</Title>
		</View>
	</View>
)
