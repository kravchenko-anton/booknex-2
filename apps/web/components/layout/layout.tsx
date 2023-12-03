import type { FC, HTMLAttributes, PropsWithChildren } from 'react'

interface LayoutProperties
	extends PropsWithChildren,
		HTMLAttributes<HTMLDivElement> {}
const Layout: FC<LayoutProperties> = ({ children, ...rest }) => {
	return (
		<div className='mt-[70px]' {...rest}>
			{' '}
			{children}
		</div>
	)
}

export default Layout
