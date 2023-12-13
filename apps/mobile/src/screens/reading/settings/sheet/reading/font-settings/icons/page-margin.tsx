import type { PressableDefaultProperties } from '@/components/component-types'
import PressableContainer from '@/components/pressable-container/pressable-container'
import { Color } from '@/ui/colors'
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
		className='border-gray m-0 h-[32px] justify-between border-2 border-b-0'
		{...properties}
	>
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
