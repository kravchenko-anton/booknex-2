import type {
	ListCategoryItemType,
	ListItemType
} from '@/screens/settings/types'
import { Title } from '@/ui'
import { cn } from '@/utils'
import { ChevronRight } from 'icons'
import type { PropsWithChildren } from 'react'
import { Pressable, View } from 'react-native'

export const Category = ({
	title,
	children,
	className,
	...properties
}: PropsWithChildren<ListCategoryItemType>) => (
	<View
		key={title}
		className={cn('mb-2 w-full rounded-lg', className)}
		{...properties}
	>
		<Title size={'xxl'} weight='bold' className='mb-2'>
			{title}
		</Title>
		<View className='bg-foreground border-bordered rounded-lg border-[1px] p-1.5'>
			{children}
		</View>
	</View>
)
//TODO: сделать тут анимированный компонент где будет анимация при нажатии и смена на серый цвет внутрених компонентов
export const Item = ({
	title,
	icon: Icon,
	className = '',
	onPress,
	bordered,
	...properties
}: ListItemType) => (
	<Pressable
		key={title}
		className={cn(
			'flex-row items-center justify-between px-2 py-2',
			bordered && 'border-muted border-b-[1px] pb-3',
			className
		)}
		onPress={onPress}
		{...properties}
	>
		<View className='flex-row items-center justify-center'>
			<Icon width={25} height={25} className='mr-4' color='#F0E8E6' />
			<Title size={'lg'} weight='regular' color='#F0E8E6'>
				{title}
			</Title>
		</View>
		<ChevronRight width={25} height={25} color='#F0E8E6' />
	</Pressable>
)
