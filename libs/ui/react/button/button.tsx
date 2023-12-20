import type { FC } from 'react'
import { InteriorColor } from '../../colors'
import Loader from '../loader/loader'
import { iconSizeProperty, StyledButton } from './styles'
import type { ButtonProperties } from './types'


const Button: FC<ButtonProperties> =
	({
		 children,
		 size = 'md',
		 icon: Icon,
		 disabled = false,
		 fullWidth = false,
		 color = 'primary',
		 isLoading = false,
		 ...properties
	 }) => {
		return (
			<StyledButton
				fullWidth={fullWidth}
				disabled={disabled || isLoading}
				color={color}
				size={size}
				{...properties}
			>
				{children}
				{isLoading && <Loader
					width={iconSizeProperty[size]}
					height={iconSizeProperty[size]}
					color={InteriorColor[color]} />}
				{!!Icon && !isLoading && (
					<Icon width={iconSizeProperty[size]}
					      color={InteriorColor[color]}
					      height={iconSizeProperty[size]} />
				)}
			</StyledButton>
		)
	}


export default Button
