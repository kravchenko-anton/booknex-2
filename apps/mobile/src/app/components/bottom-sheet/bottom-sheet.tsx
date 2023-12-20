import { AnimatedView } from '@/components/animated'
import { useBottomSheet } from '@/components/bottom-sheet/useBottomSheet'
import type { FC } from 'react'
import { StatusBar, View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { SCREEN_HEIGHT } from 'ui/react-native/utils/dimensions'
// TODO: улучшить тут код до иделала по производительности и тж

const BottomSheet: FC = () => {
	const { bottomSheetStyle, colorPallet, bottomSheet, gesture, touch } =
		useBottomSheet()
	if (!bottomSheet) return null
	return (
		<>
			<AnimatedView
				entering={FadeIn}
				exiting={FadeOut}
				onTouchStart={touch.wrapper}
				className="absolute z-0 h-full w-full flex-1  bg-[#0000006a]"
			/>
			<StatusBar hidden={true} />
			<GestureDetector gesture={gesture}>
				<AnimatedView
					style={[
						{
							top: SCREEN_HEIGHT,
							paddingBottom: 40,
							backgroundColor: colorPallet.backgroundColor
						},
						bottomSheetStyle
					]}
					className="absolute w-full flex-1 pt-3.5"
				>
					<View
						pointerEvents="none"
						className="bg-gray mb-3 mt-1 h-[6px] w-[50px] items-center justify-center self-center rounded-full"
					/>
					<bottomSheet.component />
				</AnimatedView>
			</GestureDetector>
		</>
	)
}

export default BottomSheet