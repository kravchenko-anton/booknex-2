'use client'
import { H1 } from '@/ui/components'
import styled from 'styled-components'

const StyledWrapper = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
	justify-content: center;
	align-items: center;
`

export default function Custom404() {
	return (
		<StyledWrapper>
			<H1>404 - Page Not Found</H1>
		</StyledWrapper>
	)
}
