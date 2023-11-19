import { useHamburgerAnimation } from '@/components/ui/hamburger-menu/hamburger-animation'
import type { HamburgerMenuProperties } from '@/components/ui/hamburger-menu/hamburger-menu-types'
import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { AnimatedPressable, AnimatedView } from '@/types/component-types'
import { Color } from '@/utils/color'
import { WINDOW_HEIGHT } from '@/utils/dimensions'
import type { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

const HamburgerLineStyle = 'w-6 h-0.5'

const HamburgerMenu: FC<HamburgerMenuProperties> = ({
	color = Color.black,
	position = 'left',
	elements
}) => {
	const isOpen = useSharedValue(false)
	const animation = useHamburgerAnimation(isOpen, position)
	return (
		<>
			<AnimatedPressable
				onTouchStart={() => (isOpen.value = false)}
				className='z-20 '
				style={[
					{
						...StyleSheet.absoluteFillObject,
						height: WINDOW_HEIGHT
					},
					animation.backdropStyle
				]}
			/>
			<View className='relative z-50'>
				<AnimatedPressable
					className='z-50 p-4'
					onPress={() => (isOpen.value = !isOpen.value)}
					style={[
						{
							...(position === 'left'
								? { paddingLeft: 0 }
								: { paddingRight: 0 })
						},
						animation.styleAnimation
					]}>
					<AnimatedView
						className={HamburgerLineStyle}
						style={[
							{ backgroundColor: color },
							animation.transformFirstLineAnimation
						]}
					/>
					<AnimatedView
						className={HamburgerLineStyle}
						style={[
							{ backgroundColor: color },
							animation.widthSecondLineAnimation
						]}
					/>
					<AnimatedView
						className={HamburgerLineStyle}
						style={[
							{ backgroundColor: color },
							animation.transformThirdLineAnimation
						]}
					/>
				</AnimatedPressable>
				<AnimatedView
					style={[
						{
							...(position === 'left' ? { left: 0 } : { right: 0 })
						},
						animation.popupStyle
					]}
					className='absolute top-14 z-50 min-w-[180px] rounded-md bg-white p-3'>
					{elements.map(element => (
						<View
							key={element.title + element.icon}
							className='flex-row items-center'>
							<Icon name={element.icon} size={'small'} />
							<Title
								className='py-3'
								size={18}
								numberOfLines={2}
								weight={'regular'}
								onPress={element.onPress}>
								{element.title}
							</Title>
						</View>
					))}
				</AnimatedView>
			</View>
		</>
	)
}

export default HamburgerMenu
