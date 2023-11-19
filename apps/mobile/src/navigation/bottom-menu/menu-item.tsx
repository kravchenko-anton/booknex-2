import { usePressAnimation } from '@/animations/press-animation'
import { Title } from '@/components/ui/title/title'
import type {
	IMenuItem,
	TypeNavigate
} from '@/navigation/bottom-menu/menu.interface'
import { AnimatedPressable } from '@/types/component-types'
import { Color } from '@/utils/color'
import { Octicons } from '@expo/vector-icons'
import type { FC } from 'react'
import { Pressable } from 'react-native'

interface IMenuItemProperties {
	currentRoute?: string,
	item: IMenuItem,
	nav: TypeNavigate
}

const MenuItem: FC<IMenuItemProperties> = ({ currentRoute, item, nav }) => {
	const isActive = currentRoute === item.path

	const { pressFunctions, animatedStyle } = usePressAnimation()

	return (
		<Pressable
			className='w-[20%] items-center'
			onPress={() => {
				nav(item.path)
			}}
			{...pressFunctions}>
			<AnimatedPressable style={animatedStyle} pointerEvents='none'>
				<Octicons
					name={item.icon}
					size={30}
					color={isActive ? Color.secondary : Color.gray}
				/>
			</AnimatedPressable>
			<Title
				size={16}
				weight={isActive ? 'bold' : 'regular'}
				color={isActive ? Color.secondary : Color.gray}>
				{item.path}
			</Title>
		</Pressable>
	)
}

export default MenuItem
