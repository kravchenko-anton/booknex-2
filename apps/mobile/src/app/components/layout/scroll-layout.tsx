import type { ScrollViewDefaultProperties } from '@/components/component-types'
import type { FC, PropsWithChildren } from 'react'
import { memo } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Color } from 'ui/colors'
import { ScrollView } from 'ui/components'

const ScrollLayout: FC<PropsWithChildren<ScrollViewDefaultProperties>> = ({
	children,
	...properties
}) => (
	<SafeAreaView edges={['right', 'top', 'left']} className='flex-1'>
		<ScrollView className='flex-1' {...properties}>
			{children}
		</ScrollView>
		<StatusBar backgroundColor={Color.background} />
	</SafeAreaView>
)

export default memo(ScrollLayout)
