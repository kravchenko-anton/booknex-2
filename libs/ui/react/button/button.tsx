import type { FC } from 'react'
import { InteriorColor } from '../../colors'
import Loader from '../loader/loader'
import { ButtonStyleComponent } from './styles'
import type { ButtonProperties } from './types'


const iconSizeProperty = {
	sm: 16,
	md: 18,
	lg: 20
}

const Button: FC<ButtonProperties> =
	({
		 children,
		 size = 'md',
		 icon: Icon,
		 disabled = false,
		 color = 'primary',
		 isLoading = false,
		 ...rest
	 }) => {
		return (
			<ButtonStyleComponent
				disabled={disabled || isLoading}
				color={color}
				size={size}
				{...rest}
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
			</ButtonStyleComponent>
		)
	}


export default Button
