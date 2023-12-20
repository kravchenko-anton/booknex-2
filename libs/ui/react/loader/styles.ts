import styled from 'styled-components'
import type { LoaderProperties } from './loader'

export const StyledLoader = styled.svg<LoaderProperties>`
	width: ${({ width }) => width}px;
	height: ${({ height }) => height}px;
	animation: rotate 2s linear infinite;
	
	& .path {
		stroke: ${({ color }) => color};
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}
	
	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -124;
		}
	}
`
