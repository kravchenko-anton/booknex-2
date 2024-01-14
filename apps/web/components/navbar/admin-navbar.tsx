'use client'
import { AdminLinks } from '@/components/navbar/settings'
import { Button } from '@/components/ui'
import { useAction } from '@/hooks'
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
		<div className='fixed z-50 flex w-full items-center justify-center'>
			<div className='bg-foreground z-50 mb-0 flex h-[70px] items-center justify-between rounded-2xl  bg-opacity-80 backdrop-blur-xl  md:px-10'>
				<button
					className='border-vibrant flex cursor-pointer items-center gap-1 border-r-2 pr-4 text-2xl font-bold'
					onClick={() => router.push('/')}
					type='button'
				>
					<span>Booker dev 😈</span>
				</button>
				<button className='md:hidden' onClick={() => setOpen(!open)}>
					{open ? (
						<svg
							className='h-6 w-6 text-white'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								d='M6 18L18 6M6 6l12 12'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
							/>
						</svg>
					) : (
						<svg
							className='h-6 w-6 text-white'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								d='M4 6h16M4 12h16M4 18h16'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
							/>
						</svg>
					)}
				</button>
				<ul
					className={twMerge(
						'bg-shade absolute left-0 z-[-1] w-full pb-8 pl-9  transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:bg-transparent md:pb-0 md:pl-0',
						open ? 'top-[50px]' : 'top-[-400px]'
					)}
				>
					{AdminLinks.map(link => (
						<li
							className=' my-7   font-semibold md:my-0 md:ml-4'
							key={link.link}
						>
							<a
								className={twMerge(
									' font-bold duration-500 hover:text-white',
									activePath === link.link ? 'text-white' : 'text-gray'
								)}
								href={link.link}
							>
								{link.name}
							</a>
						</li>
					))}
					<Button
						className='md:static md:ml-8'
						onClick={() => logout()}
						size='md'
						variant='danger'
					>
						Logout
					</Button>
				</ul>
			</div>
		</div>
	)
}
