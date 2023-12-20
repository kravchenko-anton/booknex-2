import styled from 'styled-components'
import type { PickLineColorsTyle } from '../colors'
import { Color } from '../colors'

interface StyledTextProperties {
	size?: 'small' | 'medium' | 'large'
	color?: PickLineColorsTyle<typeof Color.white>
	fontWeight?: 'normal' | 'medium' | 'bold'
	center?: boolean
	isItalic?: boolean
}

export const headingSize = {
	small: '16px',
	medium: '24px',
	large: '32px'
}

export const textSize = {
	small: '14px',
	medium: '16px',
	large: '18px'
}

const italic = 'font-style: italic;'

export const H1 = styled.h1<StyledTextProperties>`
	font-size: ${({ size = 'large' }) => headingSize[size]};
	color: ${({ color = Color.white }) => color};
	font-weight: ${({ fontWeight = 'bold' }) => fontWeight};
	${({ isItalic = false }) => isItalic && italic}
	${({ center = false }) => center && 'text-align: center;'}
`

export const H2 = styled.h2<StyledTextProperties>`
	font-size: ${({ size = 'medium' }) => headingSize[size]};
	color: ${({ color = Color.white }) => color};
	font-weight: ${({ fontWeight = 'bold' }) => fontWeight};
	${({ isItalic = false }) => isItalic && italic}
	${({ center = false }) => center && 'text-align: center;'}
`

export const H3 = styled.h3<StyledTextProperties>`
	font-size: ${({ size = 'medium' }) => headingSize[size]};
	color: ${({ color = Color.white }) => color};
	font-weight: ${({ fontWeight = 'bold' }) => fontWeight};
	${({ isItalic = false }) => isItalic && italic}
	${({ center = false }) => center && 'text-align: center;'}
`

export const H4 = styled.h4<StyledTextProperties>`
	font-size: ${({ size = 'medium' }) => headingSize[size]};
	color: ${({ color = Color.white }) => color};
	font-weight: ${({ fontWeight = 'medium' }) => fontWeight};
	${({ isItalic = false }) => isItalic && italic}
	${({ center = false }) => center && 'text-align: center;'}
`

export const H5 = styled.h5<StyledTextProperties>`
	font-size: ${({ size = 'medium' }) => headingSize[size]};
	color: ${({ color = Color.white }) => color};
	font-weight: ${({ fontWeight = 'medium' }) => fontWeight};
	${({ isItalic = false }) => isItalic && italic}
	${({ center = false }) => center && 'text-align: center;'}
`

export const H6 = styled.h6<StyledTextProperties>`
	font-size: ${({ size = 'small' }) => headingSize[size]};
	color: ${({ color = Color.white }) => color};
	font-weight: ${({ fontWeight = 'normal' }) => fontWeight};
	${({ isItalic = false }) => isItalic && italic}
	${({ center = false }) => center && 'text-align: center;'}
`

export const Text = styled.p<StyledTextProperties>`
	font-size: ${({ size = 'small' }) => textSize[size]};
	color: ${({ color = Color.gray }) => color};
	font-weight: ${({ fontWeight = 'normal' }) => fontWeight};
	${({ isItalic = false }) => isItalic && italic}
	${({ center = false }) => center && 'text-align: center;'}
`

export const ErrorText = styled.p<StyledTextProperties>`
	font-size: ${({ size = 'small' }) => textSize[size]};
	color: ${({ color = Color.danger }) => color};
	font-weight: ${({ fontWeight = 'normal' }) => fontWeight};
	${({ isItalic = true }) => isItalic && italic}
	${({ center = false }) => center && 'text-align: center;'}
	margin-top: 8px;
`

export interface StyledFlexBoxProperties {
	beetween?: boolean
	gap?: number
	fullWidth?: boolean
	margin?: [number, number, number, number]
	padding?: [number, number, number, number]
}

export const FlexBox = styled.div<StyledFlexBoxProperties>`
	display: flex;
	flex-direction: row;
	${({ fullWidth = false }) => fullWidth && 'width: 100%;'}
	${({ padding = [0, 0, 0, 0] }) =>
		`padding: ${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px;`}
	${({ beetween = false }) => beetween && 'justify-content: space-between;'}
	${({ gap = 0 }) => gap && `gap: ${gap}px;`}
	${({ margin = [0, 0, 0, 0] }) =>
		`margin: ${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px;`}
`
