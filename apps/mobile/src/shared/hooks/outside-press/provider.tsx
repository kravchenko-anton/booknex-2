import { isInRange } from '@/shared/hooks/outside-press/utils/helpers'
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
		onResponderStart={e => {
			if (!touchX) touchX = e.nativeEvent.changedTouches[0]?.pageX
			if (!touchY) touchY = e.nativeEvent.changedTouches[0]?.pageY
			if (!e.nativeEvent.changedTouches[0] || !touchX || !touchY) return
			if (
				isInRange(
					e.nativeEvent.changedTouches[0]?.pageX,
					touchX,
					swipeThreshold
				) &&
				isInRange(
					e.nativeEvent.changedTouches[0]?.pageY,
					touchY,
					swipeThreshold
				)
			)
				setIsTouch(true)
			else if (activateOnSwipe) setIsTouch(true)
			else setIsTouch(false)
			onTouch(e)
			touchX = undefined
			touchY = undefined
		}}
		onTouchStart={e => {
			touchX = e.nativeEvent.changedTouches[0]?.pageX
			touchY = e.nativeEvent.changedTouches[0]?.pageY
			setIsTouch(true)
		}}
	>
		{children}
	</Pressable>
)
