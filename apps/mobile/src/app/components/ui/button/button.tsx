import PressableContainer from '@/components/pressable-container/pressable-container'
import { TextSize, TextWeight } from '@/components/ui/button/button-settings'
import type { ButtonProperties } from '@/components/ui/button/button-types'
import Title from '@/components/ui/title/title'
import type { Style } from '@/types/global'
import { memo } from 'react'
import { BorderRadiusSetting, PaddingSetting } from 'ui/ui-style'

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
		style={[
			{
				opacity: properties.disabled ? 0.7 : 1,
				borderRadius: BorderRadiusSetting,
				padding: PaddingSetting[size]
			},
			style as Style
		]}
		{...properties}>
		<Title
			weight={TextWeight[size]}
			size={TextSize[size]}>
			{properties.text}
		</Title>
	</PressableContainer>
}

export default memo(Button)
