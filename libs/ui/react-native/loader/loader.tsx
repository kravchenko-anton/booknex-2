import type { FC } from 'react'
import { memo } from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { Color } from '../../colors'
import { settings } from './settings'
import type { LoaderProperties } from './types'

const Loader: FC<LoaderProperties> = ({
	backgroundColor = Color.background,
	size = 'full'
}) => (
	<View
		style={{
			backgroundColor: backgroundColor,
			...settings.size[size]
		}}
		className='absolute items-center justify-center'
	>
		<ActivityIndicator
			size='large'
			color={Color.secondary}
			className='h-[30px] w-[30px]'
		/>
		<StatusBar backgroundColor={backgroundColor} />
	</View>
)

export default memo(Loader)
