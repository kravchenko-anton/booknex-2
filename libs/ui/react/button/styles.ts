import styled, { css } from 'styled-components'
import { triggerComponentPalette } from '../component-palette'
import type { ButtonProperties } from './types'

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


export const ButtonStyleComponent = styled.button<ButtonProperties>`
	width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
	display: flex;
	align-items: center;
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	gap: 0.5rem;
	justify-content: center;
	border-radius: 0.375rem;
	font-weight: 500;
	transition: all 0.2s ease;
	${({ color }) => triggerComponentPalette[color || 'vibrant']}
	${({ size }) => buttonSizeProperty[size || 'md']}
	${({ styled }) => styled}
`
