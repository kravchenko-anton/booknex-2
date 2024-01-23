import type {
	PressableDefaultProperties,
	TextDefaultProperties,
	ViewDefaultProperties
} from '@/components/component-types'
import { Title } from '@/components/ui'
import type { IconProperties } from '@/components/ui/icon/types'
import { useTypedNavigation } from '@/hooks'
import { Color } from 'global/colors'
import { ArrowLeft } from 'icons'
import type { FC, PropsWithChildren } from 'react'
import { Pressable, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

export const Header: FC<PropsWithChildren<ViewDefaultProperties>> = ({
	children,
	className,
	...properties
}) => {
	return (
		<View
			className={twMerge(
				'bg-background border-muted z-50 w-full flex-row items-center justify-between border-b-[1px]',
				className
			)}
			{...properties}
		>
			{children}
		</View>
	)
}

export const BackButton: FC<PressableDefaultProperties> = ({
	className,
	...properties
}) => {
	const { goBack } = useTypedNavigation()
	return (
		<Pressable
			onPress={goBack}
			className={twMerge('py-2', className)}
			{...properties}
		>
			<ArrowLeft width={26} height={26} color={Color.white} />
		</Pressable>
	)
}
export const BackWithTitle: FC<{ title: string }> = ({ title }) => {
	return (
		<View className='flex-row items-center'>
			<BackButton className='px-3' />
			<Title className='py-2' size={20} weight='bold' color={Color.white}>
				{title}
			</Title>
		</View>
	)
}
export const Logo: FC<Omit<TextDefaultProperties, 'onPress'>> = ({
	className,
	...properties
}) => {
	return (
		<Title
			size={22}
			weight='bold'
			className={twMerge('py-2', className)}
			color={Color.white}
			{...properties}
		>
			Booknex
		</Title>
	)
}

export const Icon: FC<
	Omit<IconProperties, 'variant' | 'noPadding' | 'size'>
> = ({ icon: Icon, className, ...properties }) => {
	return (
		<Pressable className={twMerge('py-2 ', className)} {...properties}>
			<Icon width={26} height={26} color={Color.white} />
		</Pressable>
	)
}

export default { Header, Logo, BackWithTitle, Icon }
