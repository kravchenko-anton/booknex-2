import type { FC } from 'react'
import type { LoaderProperties } from './types'

const Loader: FC<LoaderProperties> = ({
	width = 16,
	height = 16,
	color = 'primary'
}) => {
	return (
		<svg
			className='animate-spin'
			style={{
				color: color,
				width: width,
				height: height
			}}
			fill='none'
			viewBox='0 0 24 24'
		>
			<circle
				className='opacity-25'
				cx='12'
				cy='12'
				r='10'
				stroke='currentColor'
				strokeWidth='4'
			></circle>
			<path
				className='opacity-75'
				fill='currentColor'
				d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
			></path>
		</svg>
	)
}

export default Loader
