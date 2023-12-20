import styled, { css } from 'styled-components'
import { Color } from '../../colors'
import type { InputProperties } from './types'

export type InputColorPaletteType = keyof Pick<
	typeof Color,
	'gray' | 'background' | 'shade' | 'foreground' | 'vibrant'
>

export interface StyledInputProperties
	extends Required<Pick<InputProperties, 'color' | 'disabled' | 'isError'>> {
	icon: boolean
}

export const inputColorPalette = {
	gray: css`
		background-color: ${Color.gray};
		color: ${Color.white};

		::placeholder {
			color: ${Color.white};
		}

		&:hover {
			background-color: ${Color.foreground};
		}
	`,
	background: css`
		background-color: ${Color.background};
		color: ${Color.white};

		::placeholder {
			color: ${Color.white};
		}

		&:hover {
			background-color: ${Color.foreground};
		}
	`,
	shade: css`
		background-color: ${Color.shade};
		color: ${Color.white};

		::placeholder {
			color: ${Color.white};
		}

		&:hover {
			background-color: ${Color.foreground};
		}
	`,

	foreground: css`
		background-color: ${Color.foreground};
		color: ${Color.white};

		::placeholder {
			color: ${Color.white};
		}

		&:hover {
			background-color: ${Color.vibrant};
		}
	`,

	vibrant: css`
		background-color: ${Color.vibrant};
		color: ${Color.white};

		::placeholder {
			color: ${Color.white};
		}

		&:hover {
			background-color: ${Color.gray};
			color: ${Color.black};
		}
	`
}

export const StyledIconWrapper = styled.div`
	position: absolute;
	left: 8px;
	align-items: center;
	justify-content: center;
`

export const StyledInputWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const StyledInput = styled.input<StyledInputProperties>`
	${({ disabled }) => disabled && 'cursor: not-allowed; opacity: 0.5;'}
	${({ isError }) => isError && 'border: 2px solid #ff0000;'}
	border-radius: 0.375rem;
	font-size: 0.875rem;
	transition: all 0.2s ease-in-out;
	width: 100%;

	padding: ${({ icon }) =>
		icon ? '0.75rem 0.75rem 0.75rem 2.5rem' : '0.75rem'};

	&:focus {
		outline: none;
	}

	${({ color }) => inputColorPalette[color]}
`
