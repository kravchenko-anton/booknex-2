import type { LineColorType } from '@/utils/color'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'

interface BigLoaderProperties {
	backgroundColor?: LineColorType | string
}
const BigLoader: FC<BigLoaderProperties> = ({
	backgroundColor = Color.canvas
}) => (
	<View
		style={{
			backgroundColor: backgroundColor
		}}
		className='absolute h-full w-full items-center justify-center'>
		<ActivityIndicator
			size='large'
			color={Color.secondary}
			className='h-[200px] w-[200px]'
		/>
	</View>
)

export default memo(BigLoader)
