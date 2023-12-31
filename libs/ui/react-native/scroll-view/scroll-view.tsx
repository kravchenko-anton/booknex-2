import type { ScrollViewDefaultProperties } from '@/components/component-types.ts'
import type { FC } from 'react'
import { ScrollView as DefaultScrollView } from 'react-native'

const ScrollView: FC<ScrollViewDefaultProperties> = ({ ...properties }) => (
	<DefaultScrollView
		automaticallyAdjustContentInsets={false}
		overScrollMode="never"
		showsHorizontalScrollIndicator={false}
		showsVerticalScrollIndicator={false}
		renderToHardwareTextureAndroid={true}
		alwaysBounceHorizontal={false}
		alwaysBounceVertical={false}
		bounces={false}
		bouncesZoom={false}
		decelerationRate='normal'
		{...properties}
	>
		{properties.children}
	</DefaultScrollView>
)

export default ScrollView
