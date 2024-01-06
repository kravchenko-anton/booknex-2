import type {
	ListCategoryItemTypes,
	ListItemTypes
} from '@/screens/profile/settings/types'
import { ChevronRight } from 'icons'
import type { PropsWithChildren } from 'react'
import { Pressable, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Title } from 'ui/components'

export const Category = ({
	title,
	children,
	className,
	...properties
}: PropsWithChildren<ListCategoryItemTypes>) => {
	return (
		<View
			key={title}
			className={twMerge('bg-dust mb-2 w-full rounded-xl', className)}
			{...properties}
		>
			<Title size={26} weight='bold' className='mb-2'>
				{title}
			</Title>
			<View className='bg-foreground rounded-xl p-2'>{children}</View>
		</View>
	)
}
//TODO: сделать тут анимированный компонент где будет анимация при нажатии и смена на серый цвет внутрених компонентов
export const Item = ({
	title,
	icon: Icon,
	className = '',
	onPress,
	bordered,
	...properties
}: ListItemTypes) => {
	return (
		<Pressable
			key={title}
			className={twMerge(
				'flex-row items-center justify-between px-2 py-2',
				bordered && 'border-vibrant border-b-[1px] pb-3',
				className
			)}
			onPress={onPress}
			{...properties}
		>
			<View className='flex-row items-center justify-center'>
				<Icon width={25} height={25} className='mr-4' color='#F0E8E6' />
				<Title size={18} weight='regular' color='#F0E8E6'>
					{title}
				</Title>
			</View>
			<ChevronRight width={25} height={25} color='#F0E8E6' />
		</Pressable>
	)
}
