import { Color } from 'global/colors'
import Svg, { Ellipse, G, Mask, Path } from 'react-native-svg'

function mapToRange(value: number) {
	return +(100 - value)
}
export const Fire = ({ progress = 0 }: { progress?: number }) => {
	console.log(progress)
	const adaptivePercentage = -3.4 + mapToRange(progress) * 0.07
	console.log(adaptivePercentage, 'adaptivePercentage')
	const cy = 77 + (87 - 77) * adaptivePercentage
	const d = `M33.2712 ${66.7727 + (76.7727 - 66.7727) * adaptivePercentage}C33.2712 ${84.8475 + (94.8475 - 84.8475) * adaptivePercentage} 18.8836 99.5 1.13559 ${99.5 + (109.5 - 99.5) * adaptivePercentage}C-16.6124 ${99.5 + (109.5 - 99.5) * adaptivePercentage} -31 ${84.8475 + (94.8475 - 84.8475) * adaptivePercentage} -31 ${66.7727 + (76.7727 - 66.7727) * adaptivePercentage}C-31 ${48.698 + (58.698 - 48.698) * adaptivePercentage} -16.6124 ${34.0455 + (44.0455 - 34.0455) * adaptivePercentage} 1.13559 ${34.0455 + (44.0455 - 34.0455) * adaptivePercentage}C18.8836 ${34.0455 + (44.0455 - 34.0455) * adaptivePercentage} 33.2712 ${48.698 + (58.698 - 48.698) * adaptivePercentage} 33.2712 ${66.7727 + (76.7727 - 66.7727) * adaptivePercentage}Z`
	return (
		<Svg width='57' height='71' viewBox='0 0 57 71' fill='none'>
			<Path
				d='M21.7074 25.5603C15.7074 25.5603 21.2074 14.5603 16.2074 14.0603C11.2074 13.5603 -1.7926 28.5603 0.207398 43.5603C2.2074 58.5603 15.7074 70.5603 28.2074 70.5603C40.7074 70.5603 56.2074 64.5603 56.2074 43.5603C56.2074 22.5603 38.7074 1.56027 31.2074 0.0602634C23.7074 -1.43974 27.7074 25.5603 21.7074 25.5603Z'
				fill={Color.bordered}
			/>
			<Mask
				id='mask0_12_11'
				maskUnits='userSpaceOnUse'
				x='0'
				y='0'
				width='57'
				height='71'>
				<Path
					d='M21.7074 25.5603C15.7074 25.5603 21.2074 14.5603 16.2074 14.0603C11.2074 13.5603 -1.7926 28.5603 0.207398 43.5603C2.2074 58.5603 15.7074 70.5603 28.2074 70.5603C40.7074 70.5603 56.2074 64.5603 56.2074 43.5603C56.2074 22.5603 38.7074 1.56027 31.2074 0.0602634C23.7074 -1.43974 27.7074 25.5603 21.7074 25.5603Z'
					fill='white'
				/>
			</Mask>
			<G mask='url(#mask0_12_11)'>
				<Ellipse cx='43.9831' cy={cy} rx='43.5169' ry='45' fill='#F48C06' />
				<Path d={d} fill='#F48C06' />
			</G>
		</Svg>
	)
}
