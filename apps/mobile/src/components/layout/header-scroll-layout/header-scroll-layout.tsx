import AnimatedHeader from '@/components/header/animated-header/animated-header'
import Header from '@/components/header/header'
import type { HeaderScrollLayoutProperties } from '@/components/layout/header-scroll-layout/header-scroll-layout-types'
import ScrollLayout from '@/components/layout/scroll-layout'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

const HeaderScrollLayout: FC<
	PropsWithChildren<HeaderScrollLayoutProperties>
> = ({ header, animatedHeader, children, ...properties }) => {
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
				<Header className='px-2' {...header} />
				<View {...properties}>{children}</View>
			</ScrollLayout>
		</>
	)
}

export default HeaderScrollLayout
