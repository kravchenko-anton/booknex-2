import AnimatedPress from '@/ui/animated-press/animated-press'
import { cn } from '@/utils'
import { InnerColor } from 'global/colors'
import { ActivityIndicator } from 'react-native'
import Title from '../title/title'
import { settings } from './settings'
import type { ButtonProperties } from './types'
//TODO сделать вместе с иконкой компонент кнопки и сделать чтобы можно было справа разместить, так-же сделать в genre отображение иконки исходя из url
const Button = ({
	size = 'lg',
	variant = 'foreground',
	disabled = false,
	isLoading = false,
	icon: Icon,

	className = '',
	children = '',
	...properties
}: ButtonProperties) => (
	<AnimatedPress
		disabled={disabled || isLoading}
		className={cn(
			'flex-row items-center justify-center rounded-md',
			settings.padding[size],

			settings.colors[variant],
			(disabled || isLoading) && 'opacity-70',
			className
		)}
		{...properties}>
		{isLoading ? (
			<ActivityIndicator
				className='mr-2 mt-0.5'
				color={InnerColor[variant]}
				style={{
					width: settings.iconSize[size],
					height: settings.iconSize[size]
				}}
			/>
		) : null}

		{!!Icon && !isLoading && (
			<Icon
				className='mr-2 mt-1'
				color={InnerColor[variant]}
				width={settings.iconSize[size]}
				height={settings.iconSize[size]}
			/>
		)}
		{/* {!!Icon && !isLoading && typeof Icon === 'string' && ( */}
		{/* 	<SvgUri */}
		{/* 		uri={Icon} */}
		{/* 		width={settings.iconSize[size]} */}
		{/* 		height={settings.iconSize[size]} */}
		{/* 		color={InnerColor[variant]} */}
		{/* 		className='mr-2 mt-1' */}
		{/* 	/> */}
		{/* )} */}
		<Title
			weight='semiBold'
			color={InnerColor[variant]}
			size={settings.titleSize[size]}>
			{children}
		</Title>
	</AnimatedPress>
)

export default Button
