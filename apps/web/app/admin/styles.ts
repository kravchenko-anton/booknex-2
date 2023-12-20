import styled from 'styled-components'

export const StyledWrapper = styled.div`
	margin-top: 70px;

	@media (min-width: 768px) {
		display: flex;
	}
`

export const StyledContent = styled.div`
	@media (min-width: 768px) {
		width: calc(100% - 56px);
		margin-left: 56px;
	}
	width: 100%;
	padding: 1rem;
	animation: fadeIn 0.3s ease-in-out;
`
