import { useAction } from '@/hooks'
import { cn } from '@/utils'
import { Book, Graph, Logout, Settings, User } from 'icons'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'

export const iconsList = [
	{ icon: Graph, link: '/admin/dashboard', name: 'Dashboard' },
	{ icon: User, link: '/admin/users', name: 'Users' },
	{ icon: Book, link: '/admin/books', name: 'Books' },
	{ icon: Settings, link: '/admin/parser', name: 'Parser' }
	// { icon: Library, link: '/admin/collections', name: 'Collections' }
]

export const Sidebar: FC = () => {
	const { logout } = useAction()
	const activePath = usePathname()
	return (
		<div className='z-0 h-full w-full justify-center duration-100 ease-linear md:fixed md:w-[190px] md:flex-col'>
			<ul className='bg-foreground border-muted flex w-full justify-between border-b-2 p-5 text-sm md:h-full md:flex-col md:border-r-2'>
				<button
					className='flex cursor-pointer items-center text-2xl font-bold md:mb-12'
					type='button'
				>
					<span className='bg-muted hidden rounded-xl p-1 text-[21px] text-white md:block md:w-full '>
						Booknex 🧑‍💻
					</span>
				</button>
				{iconsList.map(icon => (
					<li className='w-full' key={icon.link}>
						<a
							href={icon.link}
							className={cn(
								'my-2 flex items-center p-2 duration-100  ease-linear md:gap-3'
							)}
						>
							<icon.icon
								width={22}
								height={22}
								className='hidden  md:block'
								style={{
									color: activePath === icon.link ? '#fff' : '#9ca3af'
								}}
							/>
							<span
								className='block text-sm md:text-[16px]'
								style={{
									color: activePath === icon.link ? '#fff' : '#9ca3af'
								}}
							>
								{icon.name}
							</span>
						</a>
					</li>
				))}
				<div
					className='text-danger flex cursor-pointer items-center duration-100 ease-linear md:mt-auto  md:gap-3 md:p-2'
					onClick={() => logout()}
				>
					<Logout className='hidden md:block' width={22} height={22} />
					<span className='block text-sm md:text-[16px]'>Logout</span>
				</div>
			</ul>
		</div>
	)
}

export default Sidebar
