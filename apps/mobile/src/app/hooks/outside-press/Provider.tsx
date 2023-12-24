import { isInRange } from '@/hooks/outside-press/utils/helpers'
import type { FC } from 'react'
import React from 'react'
import { View } from 'react-native'
import { onTouch, setIsTouch } from './utils/collection'

type ClickOutsideProviderProperties = {
	activateOnSwipe?: boolean
	swipeThreshold?: number
	children: React.ReactNode
}

let touchX: number | undefined
let touchY: number | undefined
export const ClickOutsideProvider: FC<ClickOutsideProviderProperties> = ({
	children,
	activateOnSwipe,
	swipeThreshold = 8
}) => (
	<View
		className='flex-1'
		onTouchEnd={e => {
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
	</View>
)
