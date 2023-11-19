import type { HeaderProperties } from '@/components/header/header-types'
import { useHeader } from '@/components/header/useHeader'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { View } from 'react-native'

const Header: FC<HeaderProperties> = ({
	style,
	color = Color.black,
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
			className='flex-row items-center justify-between'
			style={style}
			{...properties}>
			{leftComponent}
			{rightComponent}
		</View>
	)
}

export default Header
