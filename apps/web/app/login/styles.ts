import styled from 'styled-components'
import { Color } from '../../../../libs/ui/colors'

export const StyledWrapper = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	justify-content: center;
	align-items: center;
`
export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 450px;
	padding: 1.4rem;
	border-radius: 1rem;
	background-color: ${Color.shade};
`
