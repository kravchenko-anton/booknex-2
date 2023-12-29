import type {
	ListCategoryItemTypes,
	ListItemTypes
} from '@/screens/profile/settings/types'
import type { PropsWithChildren } from 'react'
import { Pressable, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Color } from 'ui/colors'
import { Icon as IconComponent, Title } from 'ui/components'

export const Category = ({
	title,
	children,
	className,
	...properties
}: PropsWithChildren<ListCategoryItemTypes>) => {
	return (
		<View
			key={title}
			className={twMerge('bg-dust mb-2 w-full rounded-md', className)}
			{...properties}
		>
			<Title size={26} weight='bold' className='mb-2'>
				{title}
			</Title>
			{children}
		</View>
	)
}

export const Item = ({
	title,
	icon,
	onPress,
	...properties
}: ListItemTypes) => {
	return (
		<Pressable
			key={title}
			onPress={onPress}
			className='mb-2 ml-4 flex-row items-center justify-between'
			{...properties}
		>
			<View className='flex-row items-center justify-center'>
				<IconComponent
					size='sm'
					icon={icon}
					noPadding
					variant='transparent'
					className='mr-2 mt-1'
				/>
				<Title size={18} weight='bold' color={Color.gray}>
					{title}
				</Title>
			</View>
		</Pressable>
	)
}
