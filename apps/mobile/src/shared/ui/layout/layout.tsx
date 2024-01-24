import type { ViewDefaultProperties } from '@/shared/types/component-types'
import type { FC, PropsWithChildren } from 'react'
import { memo } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { twMerge } from 'tailwind-merge'

const Layout: FC<PropsWithChildren<ViewDefaultProperties>> = ({
	children,
	className,
	...properties
}) => (
	<SafeAreaView edges={['right', 'top', 'left']} className='flex-1'>
		<View className={twMerge('flex-1 p-2', className)} {...properties}>
			{children}
		</View>
	</SafeAreaView>
)

export default memo(Layout)
