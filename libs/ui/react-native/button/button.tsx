import { memo } from 'react'
import { PressableContainer } from '../../../../../apps/mobile/src/app/components'
import { BorderRadiusSetting, PaddingSetting } from '../../../ui-style'
import Title from '../title/title'
import { TextSize, TextWeight } from './button-settings'
import type { ButtonProperties } from './button-types'

const colorPallete = {
	gray: 'bg-gray text-white ',
	foreground:
		'bg-foreground text-white ',
	vibrant:
		'bg-vibrant  text-white',
	shade:
		'bg-shade  text-white',
	background:
		'bg-background  text-white'
}
const Button = ({
	                size = 'large',
	                variant = 'danger',
	                style,
	                ...properties
                }: ButtonProperties) => {
	return <PressableContainer
		className="items-center justify-center"
		style={{
				opacity: properties.disabled ? 0.7 : 1,
				borderRadius: BorderRadiusSetting,
				padding: PaddingSetting[size]
			}}
		{...properties}>
		<Title
			weight={TextWeight[size]}
			size={TextSize[size]}>
			{properties.text}
		</Title>
	</PressableContainer>
}

export default memo(Button)
