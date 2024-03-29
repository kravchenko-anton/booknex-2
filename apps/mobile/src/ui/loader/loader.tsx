import { Color } from 'global/colors'
import type { FC } from 'react'
import { ActivityIndicator, View } from 'react-native'

interface LoaderProperties {
	background?: string
}

const Loader: FC<LoaderProperties> = ({ background = Color.background }) => (
	<View
		className='flex-1 items-center justify-center'
		style={{
			backgroundColor: background
		}}>
		<ActivityIndicator
			size='large'
			color={Color.primary}
			className='h-[80px] w-[80px]'
		/>
	</View>
)

export default Loader
