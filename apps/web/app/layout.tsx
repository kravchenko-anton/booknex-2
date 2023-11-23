import { Space_Grotesk } from 'next/font/google'
import Providers from '../providers/query-provider'
import './global.css'

export const metadata = {
  title: 'Booker',
  description: 'Mobile app for reading books'
}

const SpaceGrotesk = Space_Grotesk({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={`${SpaceGrotesk.className}`}><Providers>{children}</Providers></body>
    </html>
  )
}
