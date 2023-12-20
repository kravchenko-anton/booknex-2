import styled, { css } from 'styled-components'
import { Color } from '../../colors'
import type { ButtonProperties } from './types'

export type StyledButtonProperties = Required<
	Pick<ButtonProperties, 'size' | 'color' | 'fullWidth'>
>

export type ButtonColorPaletteType = keyof Pick<
	typeof Color,
	| 'gray'
	| 'primary'
	| 'secondary'
	| 'danger'
	| 'success'
	| 'foreground'
	| 'warning'
	| 'vibrant'
>

export const buttonColorPalette = {
	foreground: css`
		background-color: ${Color.foreground};
		color: ${Color.white};

		:hover {
			background-color: ${Color.vibrant};
		}
	`,
	gray: css`
		background-color: ${Color.gray};
		color: ${Color.white};

		:hover {
			background-color: ${Color.vibrant};
		}
	`,
	primary: css`
		background-color: ${Color.primary};
		color: ${Color.white};

		:hover {
			background-color: ${Color.secondary};
		}
	`,

	secondary: css`
		background-color: ${Color.secondary};
		color: ${Color.white};

		:hover {
			background-color: ${Color.primary};
		}
	`,

	danger: css`
		background-color: ${Color.danger};
		color: ${Color.white};
	`,

	success: css`
		background-color: ${Color.success};
		color: ${Color.white};
	`,

	warning: css`
		background-color: ${Color.warning};
		color: ${Color.white};
	`,

	vibrant: css`
		background-color: ${Color.vibrant};
		color: ${Color.white};

		:hover {
			background-color: ${Color.gray};
		}
	`
}

const buttonSizeProperty = {
	sm: css`
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
	`,
	md: css`
		padding: 0.75rem 1rem;
		font-size: 1rem;
	`,
	lg: css`
		padding: 0.7rem 1.25rem;
		font-size: 1.3rem;
	`
}

export const iconSizeProperty = {
	sm: 16,
	md: 18,
	lg: 20
}

export const StyledButton = styled.button<StyledButtonProperties>`
	width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
	display: flex;
	align-items: center;
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	gap: 0.5rem;
	justify-content: center;
	border-radius: 0.375rem;
	font-weight: 500;
	transition: all 0.2s ease;
	${({ color }) => buttonColorPalette[color]}
	${({ size }) => buttonSizeProperty[size]}
`
