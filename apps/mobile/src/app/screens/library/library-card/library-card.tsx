import { PressableContainer } from '@/components'
import type { LibraryListElementType } from '@/screens/library/library-card/types'
import type { FC } from 'react'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { Icon, Title } from 'ui/components'

const LibraryCard: FC<LibraryListElementType> = ({
	icon,
	name,
	count,
	style,
	...properties
}) => (
	<PressableContainer
		className='bg-dust w-full flex-row items-center justify-between rounded-xl p-4'
		style={style}
		{...properties}
	>
		<View className='flex-row items-center justify-between'>
			<Icon icon={icon} size='medium' className='w-[40px] pb-0 pl-0 pt-0' />
			<Title size={20} weight='bold'>
				{name}
			</Title>
		</View>
		<Title size={20} weight='regular' color={Color.secondary}>
			{count}
		</Title>
	</PressableContainer>
)

export default LibraryCard
