import PressableContainer from '@/components/pressable-container/pressable-container'
import type { PressableDefaultProperties } from '@/types/component-types'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { View } from 'react-native'

interface PageMarginIconProperties extends PressableDefaultProperties {
	backgroundColor: string
}

const LineStyle = 'w-6 h-[2px]'
const PageMarginIcon: FC<PageMarginIconProperties> = ({
	backgroundColor = Color.black,
	...properties
}) => (
	<PressableContainer
		className='m-0 h-[32px] justify-between border-2 border-b-0 border-gray'
		{...properties}>
		{Array.from({ length: 4 })
			.fill(0)
			.map((_, index) => {
				return (
					<View
						key={`${index} margin`}
						className={LineStyle}
						style={{
							backgroundColor: backgroundColor
						}}
					/>
				)
			})}
	</PressableContainer>
)

export default PageMarginIcon
