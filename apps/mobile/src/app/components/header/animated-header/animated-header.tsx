import { AnimatedView } from '@/components/animated'
import { useHeaderAnimation } from '@/components/header/animated-header/animation'
import type { AnimatedHeaderProperties } from '@/components/header/animated-header/types'
import { HeaderElementComponent } from '@/components/header/useHeader'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { ChevronLeft } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Color } from 'ui/colors'
import { AnimatedIcon, Title } from 'ui/components'

const AnimatedHeader: FC<AnimatedHeaderProperties> = properties => {
	const { goBack } = useTypedNavigation()
	const { headerStyle } = useHeaderAnimation(
		properties.scrollPosition,
		properties.transientValue
	)
	const { top } = useSafeAreaInsets()
	return (
		<AnimatedView
			className='bg-canvas absolute left-0 right-0 z-50'
			style={[{ top }, headerStyle]}
		>
			<View className='mt-auto flex-row items-center justify-between px-4 py-0.5'>
				<View className='flex-row items-center'>
					<AnimatedIcon
						icon={ChevronLeft}
						onPress={() => {
							goBack()
						}}
						size='md'
						className='pl-0'
					/>
					<Title size={18} className='w-3/4' weight='bold'>
						{properties.title}
					</Title>
				</View>
				{properties.right
					? HeaderElementComponent(
							Object.keys(properties.right)[0],
							properties.right,
							Color.white,
							'right'
						)
					: null}
			</View>
		</AnimatedView>
	)
}

export default AnimatedHeader
