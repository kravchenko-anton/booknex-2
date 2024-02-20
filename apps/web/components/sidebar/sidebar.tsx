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
		<div className='fixed z-0 h-full w-[220px] justify-center duration-100 ease-linear md:flex-col'>
			<ul className='bg-foreground border-muted flex h-full w-full flex-col justify-between border-r-2 p-5 text-sm'>
				<button
					className='mb-12 flex cursor-pointer items-center text-2xl font-bold'
					type='button'
				>
					<span className='bg-muted w-full rounded-xl p-1 text-[21px] text-white '>
						Booknex dev 📕
					</span>
				</button>
				{iconsList.map(icon => (
					<li className='w-full' key={icon.link}>
						<a
							href={icon.link}
							className={cn(
								'my-2 flex items-center gap-3 p-2  duration-100 ease-linear',
								activePath === icon.link ? 'bg-muted rounded-lg text-white' : ''
							)}
						>
							<icon.icon width={27} height={27} />
							<span
								className='hidden text-lg md:block'
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
					className='text-danger mt-auto flex cursor-pointer gap-3 p-2  duration-100 ease-linear'
					onClick={() => logout()}
				>
					<Logout width={27} height={27} />
					<span className='hidden text-lg md:block'>Logout</span>
				</div>
			</ul>
		</div>
	)
}

export default Sidebar
