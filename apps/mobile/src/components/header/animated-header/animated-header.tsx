import type { AnimatedHeaderProperties } from '@/components/header/animated-header/animated-header-types'
import { useHeaderAnimation } from '@/components/header/animated-header/header-animation'
import { HeaderElementComponent } from '@/components/header/useHeader'
import AnimatedIcon from '@/components/ui/icon/animated-icon'
import Title from '@/components/ui/title/title'
import { ChevronLeft } from '@/global/icons/react-native'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Color } from '@/ui/colors'
import type { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AnimatedView } from 'src/components/animated'

const AnimatedHeader: FC<AnimatedHeaderProperties> = properties => {
	const { goBack } = useTypedNavigation()
	const { headerStyle } = useHeaderAnimation(
		properties.scrollPosition,
		properties.transientValue
	)
	const { top } = useSafeAreaInsets()
	return (
		<AnimatedView
			className='absolute left-0 right-0 z-50 bg-canvas'
			style={[{ top }, headerStyle]}>
			<View className='mt-auto flex-row items-center justify-between px-4 py-0.5'>
				<View className='flex-row items-center'>
					<AnimatedIcon
						icon={ChevronLeft}
						onPress={() => {
							goBack()
						}}
						size={'medium'}
						className='pl-0'
						color={Color.black}
					/>
					<Title size={18} className='w-3/4' weight={'bold'}>
						{properties.title}
					</Title>
				</View>
				{properties.right
					? HeaderElementComponent(
							Object.keys(properties.right)[0],
							properties.right,
							Color.black,
							'right'
					  )
					: null}
			</View>
		</AnimatedView>
	)
}

export default AnimatedHeader
