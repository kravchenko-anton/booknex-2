import type {
	PressableDefaultProperties,
	ScrollViewDefaultProperties,
	TextDefaultProperties,
	ViewDefaultProperties
} from '@/components/component-types'
import ScrollLayout from '@/components/layout/scroll-layout'
import { useTypedNavigation } from '@/hooks'
import { ArrowLeft } from 'icons'
import type { FC, PropsWithChildren } from 'react'
import { Pressable, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Color } from 'ui/colors'
import { Title } from 'ui/components'
import type { IconProperties } from '../../../../../../../libs/ui/react-native/icon/types'

const Wrapper: FC<
	PropsWithChildren<
		ScrollViewDefaultProperties & {
			statusBarBackgroundColor?: string
			header: JSX.Element
		}
	>
> = ({ header, children, className, ...properties }) => (
	<>
		{header}
		<ScrollLayout
			statusBarBackgroundColor={Color.shade}
			className={twMerge('py-2', className)}
			{...properties}
		>
			{children}
		</ScrollLayout>
	</>
)

export const Header: FC<PropsWithChildren<ViewDefaultProperties>> = ({
	children,
	className,
	...properties
}) => {
	return (
		<View
			className={twMerge(
				'bg-shade border-vibrant z-50 w-full flex-row items-center justify-between border-b-[1px]',
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
			Booker
		</Title>
	)
}

export const Icon: FC<
	Omit<IconProperties, 'variant' | 'noPadding' | 'size'>
> = ({ icon: Icon, className, ...properties }) => {
	return (
		<Pressable className={twMerge('py-2', className)} {...properties}>
			<Icon width={26} height={26} color={Color.white} />
		</Pressable>
	)
}

export default { Header, Wrapper, Logo, BackWithTitle, Icon }
