import type { FC } from 'react'
import Spiner from '../spiner/spiner'
import type { ButtonProperties } from './types'


const colorPallete = {
	gray: 'bg-gray text-white hover:bg-vibrant',
	foreground: 'bg-foreground text-white hover:bg-vibrant',
	vibrant: 'bg-vibrant text-white hover:bg-foreground',
	shade: 'bg-shade text-white hover:bg-foreground',
	primary: 'bg-primary text-white hover:bg-secondary',
	secondary: 'bg-secondary text-white hover:bg-primary',
	danger: 'bg-danger text-white hover:bg-danger',
	success: 'bg-success text-white hover:bg-success',
	warning: 'bg-warning text-white hover:bg-warning'
}

const sizeProperty = {
	sm: 'px-2 py-0.5 text-sm',
	md: 'px-3 py-2 text-md',
	lg: 'px-4 py-3 text-lg'
}

const iconSizeProperty = {
	sm: 16,
	md: 18,
	lg: 20
}
const Button: FC<ButtonProperties> = ({
	                                      children,
	                                      icon: Icon,
	                                      fullWidth,
	                                      size = 'md',
	                                      color = 'vibrant',
	                                      disabled = false,
	                                      isLoading = false,
	                                      className = '',
	                                      ...rest
                                      }) => {
	return (
		<button
			disabled={disabled || isLoading}
			style={{
				opacity: disabled || isLoading ? 0.5 : 1,
				cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
				width: fullWidth ? '100%' : 'auto'
			}}
			className={`flex items-center justify-center gap-2 rounded-md p-2 px-3 font-semibold duration-200 ease-linear ${colorPallete[color]} ${sizeProperty[size]} ${className}`}
			{...rest}>
			{isLoading && <Spiner size={size} color="white" />}
			{!!Icon && !isLoading && (
				<Icon width={iconSizeProperty[size]} height={iconSizeProperty[size]} />
			)}
			{children}
		</button>
	)
}

export default Button
