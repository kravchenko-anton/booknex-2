import { memo } from 'react'
import { PressableContainer } from '../../../../apps/mobile/src/app/components'
import { BorderRadiusSettings } from '../../settings'
import Title from '../title/title'
import { TextSize, TextWeight } from './button-settings'
import type { ButtonProperties } from './button-types'

const PaddingSetting = {
	small: 6,
	medium: 8,
	large: 10
}

const Button = ({
	size = 'large',
	variant = 'danger',
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
			<Title weight={TextWeight[size]} size={TextSize[size]}>
				{properties.text}
			</Title>
		</PressableContainer>
	)
}

export default memo(Button)
