import type { FC } from 'react'
import { memo } from 'react'
import styled from 'styled-components/native'
import { Color } from '../../../colors'
import { fontSettings } from './title-settings'
import type { TitleProperties } from './title-types'

const Component = styled.Text<TitleProperties>`
	color: ${(properties) => properties.color ?? Color.white};
	font-family: ${(properties) => fontSettings[properties.weight || 'medium']};
	font-size: ${(properties) => properties.size}px;
	text-align: ${(properties) => (properties.center ? 'center' : 'left')};
	${(properties) => properties.styles}
`

const Title: FC<TitleProperties> =
	({
		 children,
		 numberOfLines = 1,
		 weight = 'light',
		 size = 20,
		 center = false,
		 styles,
		 ...properties
	 }) => {
		return (
			<Component
				weight={weight}
				styles={styles}
				size={size}
				center={center}
				numberOfLines={numberOfLines}
				{...properties}>
				{children}
			</Component>
		)
	}

export default memo(Title)
