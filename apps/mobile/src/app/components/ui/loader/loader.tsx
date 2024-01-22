import { Color } from 'global/colors'
import type { FC } from 'react'
import { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loader: FC<{ background?: string }> = ({
	background = Color.background
}) => (
	<View
		style={{
			backgroundColor: background
		}}
		className='flex-1 items-center justify-center'
	>
		<ActivityIndicator
			size='large'
			color={Color.secondary}
			className='h-[40px] w-[40px] '
		/>
	</View>
)

export default memo(Loader)
