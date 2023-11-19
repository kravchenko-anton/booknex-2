import PressableContainer from '@/components/pressable-container/pressable-container'
import type { PressableDefaultProperties } from '@/types/component-types'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { View } from 'react-native'

interface LineHeightIconProperties extends PressableDefaultProperties {
	backgroundColor: string
	lineCount: number
}

const LineStyle = 'w-8 h-[2px]'
const LineHeightIcon: FC<LineHeightIconProperties> = ({
	backgroundColor = Color.black,
	lineCount,
	...properties
}) => (
	<PressableContainer
		className='m-0 h-[30px] justify-between p-0'
		{...properties}>
		{Array.from({ length: lineCount }).map((_, index) => {
			return (
				<View
					key={`${index} line`}
					className={LineStyle}
					style={{
						backgroundColor: backgroundColor
					}}
				/>
			)
		})}
	</PressableContainer>
)

export default LineHeightIcon
