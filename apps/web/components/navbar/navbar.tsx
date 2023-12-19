'use client'
import { Button } from '@ui/components'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const Navbar = () => {
	const Links = [
		{ name: 'Home', link: '/' },
		{ name: 'Legal', link: '/legal' },
		{ name: 'About', link: '/about' },
		{ name: 'Contact', link: '/contact' }
	]
	const [open, setOpen] = useState(false)
	const router = useRouter()
	return (
		<div className="fixed left-0 top-0 z-50  w-full">
			<div className="bg-foreground flex h-[70px] items-center justify-between px-7 py-4 md:px-10">
				<div
					onClick={() => router.push('/')}
					className="flex cursor-pointer items-center gap-1 text-2xl font-bold">
					<span>Booker</span>
				</div>
				<div className="md:hidden" onClick={() => setOpen(!open)}>
					{open ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					)}
				</div>
				<ul
					className={`bg-shade absolute left-0 z-[-1] w-full pb-8 pl-9  transition-all  duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:pb-0 md:pl-0 ${
						open ? 'top-[50px]' : 'top-[-400px]'
					} md:bg-transparent`}>
					{Links.map(link => (
						<li className="my-7 font-semibold md:my-0 md:ml-8 " key={link.link}>
							<a
								href={link.link}
								className="text-gray font-bold duration-500 hover:text-white">
								{link.name}
							</a>
						</li>
					))}
					<Button size="md" color="secondary" className="md:static md:ml-8">
						7 day free
					</Button>
				</ul>
			</div>
		</div>
	)
}
