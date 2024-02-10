import Providers from '@/providers/app-provider'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import './global.css'

export const metadata = {
	title: 'Booknex',
	description: 'Mobile app for reading books'
}

const font = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body style={{ ...font.style }}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
