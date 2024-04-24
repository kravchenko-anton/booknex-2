// Import env need for zod validation all env set up
import { appName } from 'global/utils'
import type { ReactNode } from 'react'
import { Footer } from '@/app/(landing)/footer'
import { Header } from '@/app/(landing)/header'

export const metadata = {
	title: appName,
	description: 'Mobile app for reading books'
}

const Layout = ({ children }: { children: ReactNode }) => (
	<div>
		<Header />
	<section style={{
		minHeight: 'calc(100vh - 9rem - 3rem)'
	}}>
		{children}

	</section>
	<Footer/>
</div>

)

export default Layout
