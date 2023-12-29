import { AnimatedHeader } from '@/components/layout/header-scroll-layout/animated-header/animated-header'
import type { HeaderScrollLayoutProperties } from '@/components/layout/header-scroll-layout/types'
import ScrollLayout from '@/components/layout/scroll-layout'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

const HeaderScrollLayout: FC<
	PropsWithChildren<HeaderScrollLayoutProperties>
> = ({ title, transientValue, children, ...properties }) => {
	const scrollPosition = useSharedValue(0)
	return (
		<>
			<AnimatedHeader
				title={title}
				transientValue={transientValue}
				scrollPosition={scrollPosition}
			/>
			<ScrollLayout
				onLayout={() => {
					scrollPosition.value = 0
				}}
				onScroll={event => {
					scrollPosition.value = event.nativeEvent.contentOffset.y
				}}
			>
				<View {...properties}>{children}</View>
			</ScrollLayout>
		</>
	)
}

export default HeaderScrollLayout
