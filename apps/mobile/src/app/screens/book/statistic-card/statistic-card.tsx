import type { StatisticCardProperties } from '@/screens/book/statistic-card/types'
import type { FC } from 'react'
import { View } from 'react-native'
import { Icon, Title } from 'ui/components'

const StatisticCard: FC<StatisticCardProperties> = ({
	icon,
	count,
	description
}) => (
	<View className='flex-row items-center'>
		<Icon icon={icon} size='lg' className='pl-0' />
		<View>
			<Title size={22} weight='bold'>
				{count}
			</Title>
			<Title size={15} weight='regular'>
				{description}
			</Title>
		</View>
	</View>
)

export default StatisticCard
