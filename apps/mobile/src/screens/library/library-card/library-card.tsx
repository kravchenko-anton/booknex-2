import { Icon, PressableContainer, Title } from '@/components'
import type { LibraryListElementType } from '@/screens/library/library-card/library-card-types'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { View } from 'react-native'

const LibraryCard: FC<LibraryListElementType> = ({
	icon,
	name,
	count,
	style,
	...properties
}) => (
		<PressableContainer
			className='w-full flex-row items-center justify-between rounded-xl bg-dust p-4'
			style={style}
			{...properties}>
			<View className='flex-row items-center justify-between'>
				<Icon icon={icon} size={'medium'} className='w-[40px] pb-0 pl-0 pt-0' />
				<Title size={20} weight={'bold'}>
					{name}
				</Title>
			</View>
			<Title size={20} weight={'regular'} color={Color.secondary}>
				{count}
			</Title>
		</PressableContainer>
	)

export default LibraryCard
