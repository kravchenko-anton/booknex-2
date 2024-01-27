import { useAction } from '@/shared/hooks'
import { Book, Graph, Library, Logout, PenNib, Settings, User } from 'icons'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export const iconsList = [
	{ icon: Graph, link: '/admin/dashboard', name: 'Dashboard' },
	{ icon: User, link: '/admin/users', name: 'Users' },
	{ icon: Book, link: '/admin/books', name: 'Books' },
	{ icon: PenNib, link: '/admin/authors', name: 'Authors' },
	{ icon: Settings, link: '/admin/parser', name: 'Parser' },
	{ icon: Library, link: '/admin/collections', name: 'Collections' }
]

export default function Sidebar(): JSX.Element {
	const { logout } = useAction()
	const activePath = usePathname()
	return (
		<div className='fixed z-0 h-full w-[220px] justify-center duration-100 ease-linear md:flex-col'>
			<ul className='bg-foreground border-muted flex h-full w-full flex-col justify-between border-r-2 p-5 text-sm'>
				<button
					className='mb-12 flex cursor-pointer items-center text-2xl font-bold'
					type='button'
				>
					<span className='bg-muted rounded-xl p-2  text-white '>
						Booknex dev 😈
					</span>
				</button>
				{iconsList.map(icon => {
					return (
						<li className='w-full' key={icon.link}>
							<a
								href={icon.link}
								className={twMerge(
									'my-2 flex items-center gap-3 p-2  duration-100 ease-linear',
									activePath === icon.link
										? 'bg-muted rounded-lg text-white'
										: ''
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
					)
				})}
				<div
					onClick={() => logout()}
					className='text-danger mt-auto flex cursor-pointer gap-3 p-2  duration-100 ease-linear'
				>
					<Logout width={27} height={27} />
					<span className='hidden text-lg md:block'>Logout</span>
				</div>
			</ul>
		</div>
	)
}
