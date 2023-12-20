import type { FC } from 'react'
import { Color } from '../../colors'
import { StyledIconWrapper, StyledInput, StyledInputWrapper } from './styles'
import type { InputProperties } from './types'

const Input: FC<InputProperties> = ({
	icon: Icon,
	isError = false,
	color = 'foreground',
	value = '',
	disabled = false,
	...properties
}) => {
	return (
		<StyledInputWrapper>
			<StyledInput
				disabled={disabled}
				isError={isError}
				color={color}
				icon={!!Icon}
				value={(value ?? '').toString()}
				{...properties}
			/>
			{Icon && (
				<StyledIconWrapper>
					<Icon width={20} height={20} color={Color.gray} />
				</StyledIconWrapper>
			)}
		</StyledInputWrapper>
	)
}


export default Input
