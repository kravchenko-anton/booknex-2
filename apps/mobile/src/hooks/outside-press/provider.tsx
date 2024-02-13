import { isInRange } from '@/hooks/outside-press/utils/helpers'
import type { FC, ReactNode } from 'react'
import { Pressable } from 'react-native'
import { onTouch, setIsTouch } from './utils/collection'

interface ClickOutsideProviderProperties {
	activateOnSwipe?: boolean
	swipeThreshold?: number
	children: ReactNode
}

let touchX: number | undefined
let touchY: number | undefined
export const ClickOutsideProvider: FC<ClickOutsideProviderProperties> = ({
	children,
	activateOnSwipe = true,
	swipeThreshold = 8
}) => (
	<Pressable
		className='flex-1'
		onResponderStart={event => {
			if (!touchX) touchX = event.nativeEvent.changedTouches[0]?.pageX
			if (!touchY) touchY = event.nativeEvent.changedTouches[0]?.pageY
			if (!event.nativeEvent.changedTouches[0] || !touchX || !touchY) return
			if (
				isInRange(
					event.nativeEvent.changedTouches[0]?.pageX,
					touchX,
					swipeThreshold
				) &&
				isInRange(
					event.nativeEvent.changedTouches[0]?.pageY,
					touchY,
					swipeThreshold
				)
			)
				setIsTouch(true)
			else if (activateOnSwipe) setIsTouch(true)
			else setIsTouch(false)
			onTouch(event)
			touchX = undefined
			touchY = undefined
		}}
		onTouchStart={event => {
			touchX = event.nativeEvent.changedTouches[0]?.pageX
			touchY = event.nativeEvent.changedTouches[0]?.pageY
			setIsTouch(true)
		}}
	>
		{children}
	</Pressable>
)
