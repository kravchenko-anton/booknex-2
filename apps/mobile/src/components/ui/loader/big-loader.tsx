import type { FC } from 'react'
import { memo } from 'react'
import { ActivityIndicator, View } from 'react-native'
import type { LineColorType } from '../../../../../../libs/ui/colors'
import { Color } from '../../../../../../libs/ui/colors'

interface BigLoaderProperties {
	backgroundColor?: LineColorType | string
}
const BigLoader: FC<BigLoaderProperties> = ({
	backgroundColor = Color.background
}) => (
	<View
		style={{
			backgroundColor: backgroundColor
		}}
		className='absolute h-full w-full items-center justify-center'
	>
		<ActivityIndicator
			size='large'
			color={Color.secondary}
			className='h-[200px] w-[200px]'
		/>
	</View>
)

export default memo(BigLoader)
