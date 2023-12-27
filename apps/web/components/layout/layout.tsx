import type { LayoutProperties } from '@/components/layout/types'
import type { FC } from 'react'

const Layout: FC<LayoutProperties> = ({ children, ...properties }) => {
	return (
		<div className='mt-[70px]' {...properties}>
			{' '}
			{children}
		</div>
	)
}

export default Layout
