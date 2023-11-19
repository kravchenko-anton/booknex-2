import AdminButton from '@/components/layout/admin-button'
import ScrollView from '@/components/ui/scroll-view/scroll-view'
import type { ScrollViewDefaultProperties } from '@/types/component-types'
import type { FC, PropsWithChildren } from 'react'
import { memo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ScrollLayout: FC<PropsWithChildren<ScrollViewDefaultProperties>> = ({
	children,
	...properties
}) => (
	<SafeAreaView edges={['right', 'top', 'left']} className='flex-1'>
		<ScrollView className='flex-1' {...properties}>
			{children}
		</ScrollView>
		<AdminButton />
	</SafeAreaView>
)

export default memo(ScrollLayout)
