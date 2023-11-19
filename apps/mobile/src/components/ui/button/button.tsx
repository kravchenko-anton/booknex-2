import PressableContainer from '@/components/pressable-container/pressable-container'
import {
	BackgroundColor,
	TextColor,
	TextSize,
	TextWeight
} from '@/components/ui/button/button-settings'
import type { ButtonProperties } from '@/components/ui/button/button-types'
import {
	BorderRadiusSetting,
	PaddingSetting
} from '@/components/ui/global-settings'
import { Title } from '@/components/ui/title/title'
import type { Style } from '@/types/global'
import { memo } from 'react'

const Button = ({
	size = 'large',
	variant = 'primary',
	style,
	...properties
}: ButtonProperties) => (
		<PressableContainer
			className='items-center justify-center'
			style={[
				{
					opacity: properties.disabled ? 0.7 : 1,
					backgroundColor: BackgroundColor[variant],
					borderRadius: BorderRadiusSetting,
					padding: PaddingSetting[size]
				},
				style as Style
			]}
			{...properties}>
			<Title
				color={TextColor[variant]}
				weight={TextWeight[size]}
				size={TextSize[size]}>
				{properties.text}
			</Title>
		</PressableContainer>
	)

export default memo(Button)
