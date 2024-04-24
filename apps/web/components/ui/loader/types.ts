import type { LineColorType } from 'global/colors'
import { SVGProps } from 'react'

export interface LoaderProperties extends SVGProps<SVGSVGElement>{
	color?: LineColorType
	width?: number
	height?: number
}
