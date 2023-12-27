import type { HeaderProperties } from '@/components/header/types'
import { useHeader } from '@/components/header/useHeader'

import type { FC } from 'react'
import { View } from 'react-native'
import { Color } from 'ui/colors'

const Header: FC<HeaderProperties> = ({
	style,
	color = Color.white,
	left = { back: true },
	right,
	...properties
}) => {
	const { rightComponent, leftComponent } = useHeader({
		left,
		right,
		color
	})
	return (
		<View
			className='mt-2 flex-row items-center justify-between'
			style={style}
			{...properties}
		>
			{leftComponent}
			{rightComponent}
		</View>
	)
}

export default Header
