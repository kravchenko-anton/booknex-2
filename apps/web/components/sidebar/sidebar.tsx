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
import { appName } from 'global/utils'
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
		<div className='z-0 h-full w-full justify-center duration-100 ease-linear xl:fixed xl:w-[190px] xl:flex-col'>
			<div className='bg-foreground border-bordered flex w-full justify-between border-b-2 p-5 text-sm xl:h-full xl:flex-col xl:border-r-2'>
				<button
					className='flex cursor-pointer items-center text-2xl font-bold xl:mb-12'
					type='button'>
					<span className='bg-muted rounded  p-1 px-2 text-[21px] text-white  xl:w-full '>
						{appName} 🧑‍💻
					</span>
				</button>
				<ul className='hidden xl:block'>
					{iconsList.map(icon => (
						<li className='w-full' key={icon.link}>
							<Link
								href={icon.link}
								className={cn(
									'my-2 flex items-center p-2 duration-100  ease-linear xl:gap-3'
								)}>
								<icon.icon
									width={22}
									height={22}
									className='hidden  xl:block'
									style={{
										color: activePath === icon.link ? '#fff' : '#9ca3af'
									}}
								/>
								<span
									className='block text-sm xl:text-[16px]'
									style={{
										color: activePath === icon.link ? '#fff' : '#9ca3af'
									}}>
									{icon.name}
								</span>
							</Link>
						</li>
					))}
				</ul>
				<div
					className='text-danger hidden cursor-pointer  items-center duration-100 ease-linear xl:mt-auto xl:flex  xl:gap-3 xl:p-2'
					onClick={logout}>
					<Logout width={22} height={22} />
					<span className='block text-sm xl:text-[16px]'>Logout</span>
				</div>

				<div className='flex items-center justify-center  xl:hidden'>
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
