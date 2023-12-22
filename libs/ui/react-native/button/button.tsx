import { memo } from 'react'
import { PressableContainer } from '../../../../apps/mobile/src/app/components'
import { Color } from '../../colors'
import { BorderRadiusSettings } from '../../settings'
import Title from '../title/title'
import { TextSize } from './settings'
import type { ButtonProperties } from './types'

const PaddingSetting = {
	small: 6,
	medium: 8,
	large: 10
}

const Button = ({
	size = 'large',
	variant = 'background',
	style,
	...properties
}: ButtonProperties) => {
	return (
		<PressableContainer
			className='items-center justify-center'
			style={{
				opacity: properties.disabled ? 0.7 : 1,
				borderRadius: BorderRadiusSettings,
				padding: PaddingSetting[size]
			}}
			{...properties}
		>
			<Title weight='bold' color={Color.secondary} size={TextSize[size]}>
				{properties.text}
			</Title>
		</PressableContainer>
	)
}

export default memo(Button)
