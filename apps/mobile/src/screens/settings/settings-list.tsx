import type {
	PressableDefaultProperties,
	ViewDefaultProperties
} from '@/types/component-types'
import { Title } from '@/ui'
import { cn } from '@/utils'
import { ChevronRight } from 'icons'
import type { FC, PropsWithChildren } from 'react'
import { Pressable, View } from 'react-native'
import type { SvgProps } from 'react-native-svg'

export interface ListCategoryItemType extends ViewDefaultProperties {
	title: string
}

export interface ListItemType
	extends Omit<PressableDefaultProperties, 'pointerEvents' | 'style'> {
	title: string
	bordered?: boolean
	icon: FC<SvgProps>
}

export const Category = ({
	title,

	children,
	className,
	...properties
}: PropsWithChildren<ListCategoryItemType>) => (
	<View
		key={title}
		className={cn('mb-2 w-full rounded', className)}
		{...properties}>
		<Title size={'xxl'} weight='bold' className='mb-2'>
			{title}
		</Title>
		<View className='bg-foreground border-bordered rounded  p-1.5'>
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
			bordered && 'border-bordered pb-3',
			className
		)}
		onPress={onPress}
		{...properties}>
		<View className='flex-row items-center justify-center'>
			<Icon width={25} height={25} className='mr-4' color='#F0E8E6' />
			<Title size={'lg'} weight='regular' color='#F0E8E6'>
				{title}
			</Title>
		</View>
		<ChevronRight width={25} height={25} color='#F0E8E6' />
	</Pressable>
)
