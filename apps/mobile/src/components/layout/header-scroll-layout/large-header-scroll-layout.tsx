import AnimatedHeader from '@/components/header/animated-header/animated-header'
import type { LargeHeaderScrollLayoutProperties } from '@/components/layout/header-scroll-layout/header-scroll-layout-types'
import ScrollLayout from '@/components/layout/scroll-layout'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

const LargeHeaderScrollLayout: FC<
	PropsWithChildren<LargeHeaderScrollLayoutProperties>
> = ({ children, headerChildren, animatedHeader, ...properties }) => {
	const scrollPosition = useSharedValue(0)

	return (
		<>
			<AnimatedHeader scrollPosition={scrollPosition} {...animatedHeader} />
			<ScrollLayout
				onLayout={() => {
					scrollPosition.value = 0
				}}
				onScroll={event => {
					scrollPosition.value = event.nativeEvent.contentOffset.y
				}}>
				{headerChildren}
				<View {...properties}>{children}</View>
			</ScrollLayout>
		</>
	)
}

export default LargeHeaderScrollLayout
