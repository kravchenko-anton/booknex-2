import { usePressAnimation } from '@/animations/press-animation'
import { AnimatedPressable, AnimatedView } from '@/components/animated'
import { useDropDownAnimation } from '@/components/dropdown/animation'
import { settings } from '@/components/dropdown/settings'
import type { HamburgerMenuProperties } from '@/components/dropdown/types'
import { Icon, Title } from '@/components/ui'
import { useClickOutside } from '@/hooks/outside-press/useClickOutside'
import { InnerColor } from 'global/colors'
import { MoreHorizontal } from 'icons'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { twMerge } from 'tailwind-merge'

export const Menu: FC<PropsWithChildren<HamburgerMenuProperties>> = ({
	position = 'left',
	variant = 'foreground',
	size = 'md',
	className = '',
	fullRounded = false,
	style,
	children,
	noPadding = false
}) => {
	const isOpen = useSharedValue(false)
	const reference = useClickOutside(() => (isOpen.value = false))
	const { animatedStyle, pressFunctions } = usePressAnimation()
	const animation = useDropDownAnimation(isOpen, position)

	return (
		<View className='relative'>
			<AnimatedPressable
				ref={reference}
				className={twMerge(
					'relative  z-50 items-center justify-center self-center rounded-2xl',
					noPadding ? 'p-0' : settings.padding[size],
					settings.colors[variant],
					fullRounded && 'rounded-full',
					className
				)}
				onPress={() => (isOpen.value = !isOpen.value)}
				style={[style, animatedStyle]}
				{...pressFunctions}
			>
				<MoreHorizontal
					width={settings.size[size]}
					height={settings.size[size]}
					strokeWidth={2}
					stroke={InnerColor[variant]}
				/>
			</AnimatedPressable>
			<AnimatedView
				style={[
					{
						...(position === 'left' ? { left: 0 } : { right: 0 })
					},
					animation.popupStyle
				]}
				className='bg-foreground absolute top-14 z-50 min-w-[180px] rounded-xl p-2'
			>
				{children}
			</AnimatedView>
		</View>
	)
}

export const Element: FC<{
	title: string
	onPress: () => void
	icon: FC
}> = ({ title, onPress, icon }) => {
	return (
		<View className=' flex-row items-center'>
			<Icon icon={icon} size='sm' />
			<Title
				className='py-3'
				size={18}
				numberOfLines={2}
				weight='regular'
				onPress={onPress}
			>
				{title}
			</Title>
		</View>
	)
}
