import type { FC } from 'react'
import { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'
import type { LineColorType } from '../../colors'
import { Color } from '../../colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../utils/dimensions'

interface BigLoaderProperties {
	backgroundColor?: LineColorType | string
	size?: 'screen' | 'full'
}


const sizeSettings = {
	'full': {
		width: '100%' as '100%',
		height: '100%' as '100%'
	},
	'screen': {
		width: SCREEN_WIDTH,
		height: SCREEN_HEIGHT
	}
}
const BigLoader: FC<BigLoaderProperties> =
	({
		 backgroundColor = Color.background,
		 size
	 }) => (
		<View
			style={{
				backgroundColor: backgroundColor,
				...sizeSettings[size]
			}}
			className="absolute items-center justify-center"
		>
			<ActivityIndicator
				size="large"
				color={Color.secondary}
				className="h-[200px] w-[200px]"
			/>
		</View>
	)

export default memo(BigLoader)
