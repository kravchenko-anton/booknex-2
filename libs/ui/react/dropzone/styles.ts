import styled from 'styled-components'
import { Color } from '../../colors'
import type { DropzoneProperties } from './types'

export type StyledDropzoneType = Required<Pick<DropzoneProperties, 'size' | 'color'>>


const sizeSettings = {
	sm: 16,
	md: 16,
	lg: 20
}

export const StyledDropzone = styled.div<StyledDropzoneType>`
	margin-top: 6px;
	display: flex;
	cursor: pointer;
	align-items: center;
	justify-content: center;
	transition: opacity 0.2s ease-in-out;
	border-radius: 4px;
	border: 2px dashed ${properties => Color[properties.color]};
	padding: ${properties => sizeSettings[properties.size]}px;
`


export const StyledFileBlockWrapper = styled.div<{ hidden: boolean }>`
	display: ${properties => (properties.hidden ? 'none' : 'flex')};
	overflow: scroll;
	gap: 2px;
`

export const StyledFileBlock = styled.div<Pick<StyledDropzoneType, 'color'>>`
	margin-bottom: 8px;
	width: 100%;
	text-align: center;
	border: 2px solid ${properties => Color[properties.color]};
	padding: 0 8px 8px;
	
	> span {
		color: ${Color.gray};
	}
	
	> svg {
		margin: 2px auto;
		display: block;
	}
`
