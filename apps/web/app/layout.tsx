import { Navbar } from '@/components/navbar/navbar'
import { AuthProvider } from '@/providers/auth-provider'
import { Nunito } from 'next/font/google'
import type { ReactNode } from 'react'
import Providers from '../providers/query-provider'
import './global.css'

export const metadata = {
	title: 'Booker',
	description: 'Mobile app for reading books'
}

const font = Nunito({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body style={{ ...font.style }} id='body'>
				<Providers>
					<AuthProvider>
						<Navbar />
						{children}
					</AuthProvider>
				</Providers>
			</body>
		</html>
	)
}
