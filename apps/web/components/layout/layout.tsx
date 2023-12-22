import type { LayoutProperties } from '@/components/layout/types'
import type { FC } from 'react'

const Layout: FC<LayoutProperties> = ({ children, ...rest }) => {
	return (
		<div className='mt-[70px]' {...rest}>
			{' '}
			{children}
		</div>
	)
}

export default Layout
