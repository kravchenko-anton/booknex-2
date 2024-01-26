import { AuthProvider } from '@/features/auth/auth-provider'
import Providers from '@/shared/providers/query-provider'
import { Space_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'
import './global.css'

export const metadata = {
	title: 'Booknex',
	description: 'Mobile app for reading books'
}

const font = Space_Grotesk({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body style={{ ...font.style }} id='body'>
				<Providers>
					<AuthProvider>{children}</AuthProvider>
				</Providers>
			</body>
		</html>
	)
}
