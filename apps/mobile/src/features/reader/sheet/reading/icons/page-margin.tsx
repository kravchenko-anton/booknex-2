import type { PressableDefaultProperties } from '@/types/component-types'
import { AnimatedPress } from '@/ui'
import { Color } from 'global/colors'
import type { FC } from 'react'
import { View } from 'react-native'

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
			.map((_, index) => (
				<View
					key={`${index} margin`}
					className={lineStyle}
					style={{
						backgroundColor: backgroundColor
					}}
				/>
			))}
	</AnimatedPress>
)

export default PageMarginIcon