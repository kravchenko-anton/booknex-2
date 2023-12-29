import { AnimatedView } from '@/components/animated'
import { useHeaderAnimation } from '@/components/layout/header-scroll-layout/animated-header/animation'
import type { AnimatedHeaderProperties } from '@/components/layout/header-scroll-layout/animated-header/types'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { ChevronLeft } from 'icons'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Color } from 'ui/colors'
import { AnimatedIcon, Title } from 'ui/components'

export const AnimatedHeader: FC<
	PropsWithChildren<AnimatedHeaderProperties>
> = ({ children, ...properties }) => {
	const { goBack } = useTypedNavigation()
	const { headerStyle } = useHeaderAnimation(
		properties.scrollPosition,
		properties.transientValue
	)
	const { top } = useSafeAreaInsets()
	return (
		<AnimatedView
			className='bg-background  absolute left-0 right-0 z-50 pb-2'
			style={[{ top }, headerStyle]}
		>
			<View className='mt-auto flex-row items-center justify-between px-4 py-0.5'>
				<View className='flex-row items-center'>
					<AnimatedIcon
						variant='foreground'
						icon={ChevronLeft}
						onPress={() => {
							goBack()
						}}
						size='md'
						className='mr-2'
					/>
					<Title size={18} color={Color.white} className='w-3/4' weight='bold'>
						{properties.title}
					</Title>
				</View>
				{children}
			</View>
		</AnimatedView>
	)
}
