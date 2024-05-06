import { Color } from 'global/colors'
import Svg, { Path } from 'react-native-svg'

export const Fire = ({
	isDaySteakComplete = false
}: {
	isDaySteakComplete?: boolean
}) => (
	<Svg width='80' height='100' viewBox='0 0 57 71' fill='none'>
		<Path
			d='M22 26C16 26 21.5 15 16.5 14.5C11.5 14 -1.5 29 0.500001 44C2.5 59 16 71 28.5 71C41 71 56.5 65 56.5 44C56.5 23 39 2.00001 31.5 0.500006C24 -1 28 26 22 26Z'
			fill={isDaySteakComplete ? Color.warning : Color.gray}
		/>
	</Svg>
)
