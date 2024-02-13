import type { ViewDefaultProperties } from '@/types/component-types'
import { Title } from '@/ui/index'
import { Color } from 'global/colors'
import { NothingFound } from 'illustrations'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'

interface NothingFountProperties extends ViewDefaultProperties {
	text?: string
}

const NothingFount: FC<PropsWithChildren<NothingFountProperties>> = ({
	children,
	text = `Nothing found, try looking ${'\n'} for something else`,
	...properties
}) => (
	<View className='mt-4 flex-1 items-center justify-start' {...properties}>
		<NothingFound width={200} height={180} />
		<Title
			center
			weight='medium'
			numberOfLines={2}
			color={Color.gray}
			size={16}
		>
			{text}
		</Title>
		{children}
	</View>
)

export default NothingFount
