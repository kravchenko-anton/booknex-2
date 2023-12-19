import type { FC } from 'react'
import type { LineColorType } from '../../colors'
import { Color } from '../../colors'
import { LoaderStyledComponent } from './styles'

export interface LoaderProperties {
	color?: LineColorType
	width?: number
	height?: number
}


const Loader: FC<LoaderProperties> = ({ width = 16, height = 16, color = Color.white }) => {
	return (
		<LoaderStyledComponent
			viewBox="0 0 50 50"
			width={width}
			height={height}
			color={color}
		>
			<circle
				className="path"
				cx="25"
				cy="25"
				r="20"
				fill="none"
				strokeWidth="6"
			/>
		</LoaderStyledComponent>
	)
}

export default Loader
