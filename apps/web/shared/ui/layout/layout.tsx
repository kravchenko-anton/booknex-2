import type { LayoutProperties } from '@/shared/ui/layout/types'
import type { FC } from 'react'

const Layout: FC<LayoutProperties> = ({ children, ...properties }) => {
	return <div {...properties}> {children}</div>
}

export default Layout
