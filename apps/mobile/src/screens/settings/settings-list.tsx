import type { PressableDefaultProperties } from '@/types/component-types'
import { AnimatedPress, Title } from '@/ui'
import { cn } from '@/utils'
import { Color } from 'global/colors'
import { ChevronRight } from 'icons'
import { View } from 'react-native'

export interface ListItemType
	extends Omit<PressableDefaultProperties, 'pointerEvents' | 'style'> {
	title: string
	description?: string
	bordered?: boolean
}

export const Item = ({
	title,
	description,
	className = '',
	onPress,
	...properties
}: ListItemType) => (
	<AnimatedPress
		key={title}
		className={cn(
			'bg-muted border-bordered mx-2 my-1.5 flex-row items-center justify-between rounded-md border-[2px] px-2 py-2.5',
			className
		)}
		onPress={onPress}
		{...properties}>
		<View className='flex-row items-center justify-center'>
			<View>
				<Title size='md' weight='semiBold' color={Color.white}>
					{title}
				</Title>
				{description ? (
					<Title size='sm' numberOfLines={2} weight='light' color={Color.gray}>
						{description}
					</Title>
				) : null}
			</View>
		</View>
		<ChevronRight width={25} height={25} color='#F0E8E6' />
	</AnimatedPress>
)
