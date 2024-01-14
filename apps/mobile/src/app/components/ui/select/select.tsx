import { AnimatedPressable } from '@/components/animated'
import AnimatedPress from '@/components/animated-press/animated-press'
import type { ViewDefaultProperties } from '@/components/component-types.ts'
import { useClickOutside } from '@/hooks/outside-press/useClickOutside'
import { Color } from 'global/colors'
import { ChevronDown } from 'icons'
import type { FC } from 'react'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { ScrollView, Title } from '../index'

interface SelectProperties extends ViewDefaultProperties {
	onSelect: (value: { value: string; label: string }) => void
	active: {
		value: string
		label: string
	}
	elements: {
		value: string
		label: string
	}[]
	backgroundColor?: string
	color?: string
	fullSize?: boolean
}

const Select: FC<SelectProperties> = ({ ...properties }) => {
	const [active, setActive] = useState(false)
	const reference = useClickOutside(() => setActive(false))
	const popupAnimation = useAnimatedStyle(() => {
		return {
			opacity: withTiming(active ? 1 : 0),
			display: active ? 'flex' : 'none'
		}
	})
	return (
		<>
			<AnimatedPress
				onPress={() => setActive(!active)}
				className='relative flex-row items-center rounded-xl p-2 px-3'
				style={{
					backgroundColor: properties.backgroundColor || 'transparent'
				}}
			>
				<Title weight='bold' color={properties.color || Color.white}>
					{properties.active.label}
				</Title>
				<ChevronDown
					pointerEvents='none'
					color={properties.color || Color.white}
					width={25}
					height={25}
					className='ml-2 mt-1 h-6 w-6'
				/>
			</AnimatedPress>
			{/* //TODO: сделать чтобы тут авторматом настраивалась высота и чтобы елемент не выходит вниз за предел екрана */}
			<AnimatedPressable
				ref={reference}
				style={[
					popupAnimation,
					{
						position: 'absolute',
						zIndex: 10_000,
						backgroundColor: properties.backgroundColor || 'transparent'
					}
				]}
				className='z-50 max-h-[200px] rounded-xl'
			>
				<ScrollView>
					{properties.elements.map(element => {
						return (
							<Pressable
								onPress={() => {
									properties.onSelect(element)
									setActive(false)
								}}
								key={`${element.value}-${element.label}`}
								className='w-full flex-row items-center  justify-between p-2 '
							>
								<Title weight='bold' color={properties.color || Color.white}>
									{element.label}
								</Title>
							</Pressable>
						)
					})}
				</ScrollView>
			</AnimatedPressable>
		</>
	)
}

export default Select
