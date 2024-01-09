'use client'
import { AdminLinks } from '@/components/navbar/settings'
import { useAction } from '@/hooks'
import { Button } from '@/ui/components'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const AdminNavbar = () => {
	const [open, setOpen] = useState(false)
	const { logout } = useAction()
	const router = useRouter()
	const activePath = usePathname()
	console.log(activePath)
	return (
		<div className='z-50 '>
			<div className='bg-shade border-foreground z-50 mb-0 flex h-[70px]  items-center justify-between rounded-xl border-2 md:px-10'>
				<button
					onClick={() => router.push('/')}
					className='flex cursor-pointer items-center gap-1 text-2xl font-bold'
				>
					<span>Booker dev 😈</span>
				</button>
				<button className='md:hidden' onClick={() => setOpen(!open)}>
					{open ? (
						<svg
							className='h-6 w-6 text-white'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					) : (
						<svg
							className='h-6 w-6 text-white'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 6h16M4 12h16M4 18h16'
							/>
						</svg>
					)}
				</button>
				<ul
					className={twMerge(
						'bg-shade absolute left-0 z-[-1] w-full pb-8 pl-9  transition-all  duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:bg-transparent md:pb-0 md:pl-0',
						open ? 'top-[50px]' : 'top-[-400px]'
					)}
				>
					{AdminLinks.map(link => (
						<li className='my-7 font-semibold md:my-0 md:ml-8' key={link.link}>
							<a
								href={link.link}
								className={twMerge(
									' font-bold duration-500 hover:text-white',
									activePath === link.link ? 'text-white' : 'text-gray'
								)}
							>
								{link.name}
							</a>
						</li>
					))}
					<Button
						onClick={() => logout()}
						size='md'
						variant='danger'
						className='md:static md:ml-8'
					>
						Logout
					</Button>
				</ul>
			</div>
		</div>
	)
}
