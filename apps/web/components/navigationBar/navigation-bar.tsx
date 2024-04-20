import { appName, mailLink } from 'global/utils'
import Link from 'next/link'

export const navigationLinks = [
	{ name: 'Home', href: '/' },
	{ name: 'About us', href: '/about-us' },
	{ name: 'Contact', href: mailLink }
]

export const NavigationBar = () => (
	<div className='flex h-14 items-center justify-between px-8'>
		<Link href={'/'}>
			<h1 className='cursor-pointer text-2xl font-bold'>{appName}</h1>
		</Link>
		<ul className='flex items-center gap-4'>
			{navigationLinks.map(link => (
				<Link
					href={link.href}
					className='text-gray cursor-pointer transition-all duration-75 hover:text-white'
					key={link.name}>
					{link.name}
				</Link>
			))}
		</ul>
	</div>
)
