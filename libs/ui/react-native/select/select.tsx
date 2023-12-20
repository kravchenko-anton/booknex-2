import type { ViewDefaultProperties } from '@/components/component-types.ts'
import PressableContainer from '@/components/pressable-container/pressable-container'
import Icon from '@/components/ui/icon/icon'
import ScrollView from '@/components/ui/scroll-view/scroll-view'
import Title from '@/components/ui/title/title'
import OutsidePressHandler from '@/hooks/outside-press/components/outside-press-handler'
import { ChevronDown } from 'icons'
import type { FC } from 'react'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import type { LineColorType } from 'ui/colors'
import { Color } from 'ui/colors'

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
	
	const popupAnimation = useAnimatedStyle(() => {
		return {
			opacity: withTiming(active ? 1 : 0),
			display: active ? 'flex' : 'none'
		}
	})
	
	return (
		<>
			<PressableContainer
				onPress={() => setActive(true)}
				className="relative h-full flex-row items-center rounded-xl p-2 px-3"
				style={{
					backgroundColor: properties.backgroundColor || 'transparent'
				}}
			>
				<Title
					weight="bold"
					color={(properties.color || Color.white) as LineColorType}
				>
					{properties.active.label}
				</Title>
				<Icon
					pointerEvents="none"
					noPadding
					className="ml-2 h-6 w-6"
					icon={ChevronDown}
					size="medium"
					color={(properties.color || Color.white) as LineColorType}
				/>
			</PressableContainer>
			<OutsidePressHandler
				onOutsidePress={() => {
					setActive(false)
				}}
				disabled={!active}
				style={[
					popupAnimation,
					{
						backgroundColor: properties.backgroundColor || 'transparent'
					}
				]}
				className="absolute bottom-0 left-0 z-50 max-h-[200px] rounded-lg"
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
								className="w-full flex-row items-center  justify-between p-2 "
							>
								<Title
									weight="bold"
									color={(properties.color || Color.white) as LineColorType}
								>
									{element.label}
								</Title>
							</Pressable>
						)
					})}
				</ScrollView>
			</OutsidePressHandler>
		</>
	)
}

export default Select