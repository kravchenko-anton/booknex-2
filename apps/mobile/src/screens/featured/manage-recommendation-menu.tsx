import { Button, Title } from '@/ui'
import { Color } from 'global/colors'
import type { FC } from 'react'
import { View } from 'react-native'

interface ManageRecommendationProperties {
	onManagePress: () => void
	currentGenres: {
		id: number
		name: string
	}[]
}

const ManageRecommendationMenu: FC<ManageRecommendationProperties> = ({
	onManagePress,
	currentGenres = []
}) => (
	<View className='bg-foreground border-muted m-3 rounded-xl border-2 p-3.5'>
		<Title size={22} color={Color.white} weight='bold'>
			Manage Recommendation
		</Title>
		<Title weight='light' className='mb-4' numberOfLines={2} size={16}>
			To get new recommendations, you need to adjust your goals
		</Title>
		<View className='mb-4 flex flex-row flex-wrap gap-2'>
			{currentGenres.map(genre => (
				<Button key={genre.id} variant='muted' size='sm'>
					{genre.name}
				</Button>
			))}
		</View>

		<Button size={'md'} variant='primary' onPress={onManagePress}>
			Manage
		</Button>
	</View>
)

export default ManageRecommendationMenu
