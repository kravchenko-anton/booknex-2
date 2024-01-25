import type { PressableDefaultProperties } from '@/shared/types/component-types'
import { AnimatedPress } from '@/shared/ui'
import { Color } from 'global/colors'
import type { FC } from 'react'
import { View } from 'react-native'

interface LineHeightIconProperties extends PressableDefaultProperties {
	backgroundColor: string
	lineCount: number
}

const lineStyle = 'w-8 h-[2px]'
const LineHeightIcon: FC<LineHeightIconProperties> = ({
	backgroundColor = Color.black,
	lineCount,
	...properties
}) => (
	<AnimatedPress className='m-0 h-[30px] justify-between p-0' {...properties}>
		{Array.from({ length: lineCount }).map((_, index) => {
			return (
				<View
					key={`${index} line`}
					className={lineStyle}
					style={{
						backgroundColor: backgroundColor
					}}
				/>
			)
		})}
	</AnimatedPress>
)

export default LineHeightIcon
