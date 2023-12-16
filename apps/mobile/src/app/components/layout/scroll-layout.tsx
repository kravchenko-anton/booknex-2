import type { ScrollViewDefaultProperties } from '@/components/component-types'
import ScrollView from '@/components/ui/scroll-view/scroll-view'
import type { FC, PropsWithChildren } from 'react'
import { memo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ScrollLayout: FC<PropsWithChildren<ScrollViewDefaultProperties>> = ({
	                                                                          children,
	                                                                          ...properties
                                                                          }) => (
	<SafeAreaView edges={['right', 'top', 'left']} className="flex-1">
		<ScrollView className="flex-1" {...properties}>
			{children}
		</ScrollView>
	</SafeAreaView>
)

export default memo(ScrollLayout)
