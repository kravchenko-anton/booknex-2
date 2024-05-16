import { Button } from '@/components/ui'
import { appName, getTimeDate, installAppLink, mailLink } from 'global/utils'
import Link from 'next/link'

export const footerNavigationLinks = [
	{ name: 'About us', href: '/about-us' },
	{ name: 'Contact', href: mailLink },
	{
		name: 'Privacy policy',
		href: '/privacy-policy'
	},
	{
		name: 'Terms of service',
		href: '/terms-of-service'
	}
]
export const Footer = () => (
	<footer className='bg-foreground px-2 py-6 text-white xl:h-36'>
		<div className='mx-auto  w-full md:w-1/2 '>
			<div className={'flex flex-wrap items-center  gap-2'}>
				{footerNavigationLinks.map(link => (
					<Link
						href={link.href}
						className='text-gray mr-2 cursor-pointer transition-all duration-75 hover:text-white'
						key={link.name}>
						{link.name}
					</Link>
				))}
			</div>
			<Link href={installAppLink}>
				<Button variant='foreground' className=' mt-4' size={'sm'}>
					Download now
				</Button>
			</Link>
			<p className='mt-4'>
				© {getTimeDate().getFullYear()}, {appName}
			</p>
		</div>
	</footer>
)
