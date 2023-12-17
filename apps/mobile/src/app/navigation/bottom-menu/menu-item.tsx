import { usePressAnimation } from '@/animations/press-animation'
import { Title } from '@/components'
import { AnimatedPressable } from '@/components/animated'
import type { IMenuItem, TypeNavigate } from '@/navigation/bottom-menu/menu.interface'
import type { FC } from 'react'
import { Pressable } from 'react-native'
import { Color } from 'ui/colors'

interface IMenuItemProperties {
	currentRoute?: string
	item: IMenuItem
	nav: TypeNavigate
}

const MenuItem: FC<IMenuItemProperties> = ({ currentRoute, item, nav }) => {
	const isActive = currentRoute === item.path
	
	const { pressFunctions, animatedStyle } = usePressAnimation()
	
	return (
		<Pressable
			className="w-[20%] items-center"
			onPress={() => {
				nav(item.path)
			}}
			{...pressFunctions}>
			<AnimatedPressable style={animatedStyle} pointerEvents="none">
				<item.icon
					width={30}
					strokeWidth={2}
					stroke={isActive ? Color.white : Color.gray}
					height={30}
				/>
			</AnimatedPressable>
			<Title
				size={14}
				weight={isActive ? 'bold' : 'regular'}
				color={isActive ? Color.white : Color.gray}>
				{item.path}
			</Title>
		</Pressable>
	)
}

export default MenuItem
