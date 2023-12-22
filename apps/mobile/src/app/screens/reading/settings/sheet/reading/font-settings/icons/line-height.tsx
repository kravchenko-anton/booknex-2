import type { PressableDefaultProperties } from '@/components/component-types'
import PressableContainer from '@/components/pressable-container/pressable-container'
import type { FC } from 'react'
import { View } from 'react-native'
import { Color } from 'ui/colors'

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
	<PressableContainer
		className='m-0 h-[30px] justify-between p-0'
		{...properties}
	>
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
	</PressableContainer>
)

export default LineHeightIcon
