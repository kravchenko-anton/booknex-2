import { Space_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'
import { Navbar } from '../components/navbar/navbar'
import { AuthProvider } from '../providers/auth-provider'
import Providers from '../providers/query-provider'
import './global.css'

export const metadata = {
	title: 'Booker',
	description: 'Mobile app for reading books'
}

const SpaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${SpaceGrotesk.className}`} id='body'>
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
