import AnimatedPress from '@/components/animated-press/animated-press'
import type { PressableDefaultProperties } from '@/components/component-types'
import type { FC } from 'react'
import { View } from 'react-native'
import { Color } from 'global/colors'

interface PageMarginIconProperties extends PressableDefaultProperties {
	backgroundColor: string
}

const lineStyle = 'w-6 h-[2px]'
const PageMarginIcon: FC<PageMarginIconProperties> = ({
	backgroundColor = Color.white,
	...properties
}) => (
	<AnimatedPress
		className='border-gray m-0 h-[32px] justify-between border-2 border-b-0'
		{...properties}
	>
		{Array.from({ length: 4 })
			.fill(0)
			.map((_, index) => {
				return (
					<View
						key={`${index} margin`}
						className={lineStyle}
						style={{
							backgroundColor: backgroundColor
						}}
					/>
				)
			})}
	</AnimatedPress>
)

export default PageMarginIcon
