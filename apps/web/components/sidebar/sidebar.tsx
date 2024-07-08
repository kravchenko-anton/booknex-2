import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/services/store/auth-store'
import { cn } from '@/utils'
import { Color } from 'global/colors'
import { Book, Logout, MoreHorizontal, Settings, User } from 'icons'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { FC } from 'react'

export const iconsList = [
	{ icon: User, link: '/admin/user/catalog', name: 'Users' },
	{ icon: Book, link: '/admin/book/catalog', name: 'Books' },
	{ icon: Settings, link: '/admin/parser/catalog', name: 'Parser' }
	// { icon: Library, link: '/admin/collections', name: 'Collections' }
]

export const Sidebar: FC = () => {
	const { logout } = useAuthStore(state => ({
		logout: state.logout
	}))
	const activePath = usePathname()
	const router = useRouter()
	return (
		<div className='z-0 h-full w-full justify-center duration-100 ease-linear xl:fixed xl:w-14 xl:flex-col'>
			<div className='bg-foreground border-bordered flex w-full items-center justify-between border-b-2 p-1.5 py-2 text-sm xl:h-full xl:flex-col xl:border-r-2 xl:py-6'>
				<button
					className='flex cursor-pointer items-center text-2xl font-bold xl:mb-5'
					type='button'>
					<div className=' rounded-full bg-white p-2'>
						<Book className='text-black' height={20} width={20} />
					</div>
				</button>
				<ul className='hidden xl:block'>
					{iconsList.map(icon => (
						<li className='w-full' key={icon.link}>
							<Link
								href={icon.link}
								className={cn(
									'my-8 flex items-center duration-100  ease-linear xl:gap-5'
								)}>
								<icon.icon
									width={30}
									height={30}
									className='hidden xl:block'
									style={{
										color: activePath === icon.link ? '#fff' : '#9ca3af'
									}}
								/>
							</Link>
						</li>
					))}
				</ul>
				<div
					className='text-danger hidden cursor-pointer  items-center duration-100 ease-linear xl:mt-auto xl:flex  xl:gap-3'
					onClick={logout}>
					<Logout width={22} height={22} />
				</div>

				<div className='flex items-center justify-center  xl:hidden'>
					<DropdownMenu>
						<DropdownMenuTrigger className='focus-visible:outline-0'>
							<MoreHorizontal
								height={35}
								width={35}
								color={Color.white}
								className='bg-muted  border-bordered rounded-md border-[1px] p-1.5'
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							{iconsList.map(icon => (
								<DropdownMenuItem
									key={icon.link}
									onClick={() => {
										router.push(icon.link)
									}}>
									<icon.icon width={22} height={22} className='mr-2' />
									{icon.name}
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={logout}>
								<Logout width={22} height={22} className='mr-2' />
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
