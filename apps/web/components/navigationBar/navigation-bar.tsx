import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Color } from 'global/colors'
import { appName, mailLink } from 'global/utils'
import { MoreHorizontal } from 'icons'
import Link from 'next/link'

export const navigationLinks = [
	{ name: 'Home', href: '/' },
	{ name: 'About us', href: '/about-us' },
	{ name: 'Contact', href: mailLink }
]

export const NavigationBar = () => (
	<div className='flex h-20 items-center justify-between px-2 md:h-14 md:px-8'>
		<Link href={'/'}>
			<h1 className='cursor-pointer text-2xl font-bold'>{appName}</h1>
		</Link>
		<ul className='hidden items-center gap-4 md:flex'>
			{navigationLinks.map(link => (
				<Link
					href={link.href}
					className='text-gray cursor-pointer transition-all duration-75 hover:text-white'
					key={link.name}>
					{link.name}
				</Link>
			))}
		</ul>
		<div className='flex items-center justify-center  md:hidden'>
			<DropdownMenu>
				<DropdownMenuTrigger className='focus-visible:outline-0'>
					<MoreHorizontal
						height={40}
						width={40}
						color={Color.white}
						className='bg-muted  border-bordered rounded-md border-[1px] p-1.5'
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					{navigationLinks.map(icon => (
						<Link href={icon.href}>
							<DropdownMenuItem key={icon.name}>{icon.name}</DropdownMenuItem>
						</Link>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
)
