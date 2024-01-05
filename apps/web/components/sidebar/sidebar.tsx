import { iconsList } from '@/components/sidebar/settings'
import { Logout } from '@/global/icons/react'
import { useAction } from '@/hooks'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export default function Sidebar(): JSX.Element {
	const { logout } = useAction()
	const activePath = usePathname()
	return (
		<div className=' z-0 flex justify-center p-2 pb-4 pl-0  duration-100 ease-linear md:fixed md:h-[calc(100vh-70px)] md:flex-col'>
			<div>
				<ul className='bg-foreground ml-0 flex justify-between rounded-r-md p-2 py-4 text-sm md:block'>
					{iconsList.map(icon => {
						return (
							<li className='w-full' key={icon.link}>
								<a
									href={icon.link}
									className={twMerge(
										'flex items-center justify-center  rounded-xl p-2 duration-100 ease-linear hover:text-white',
										activePath === icon.link ? 'bg-secondary text-white' : ''
									)}
								>
									<icon.icon width={30} height={30} />
								</a>
							</li>
						)
					})}
					<div
						onClick={() => logout()}
						className='text-danger flex cursor-pointer   items-center justify-center rounded-xl p-2 duration-100 ease-linear'
					>
						<Logout width={30} height={30} />
					</div>
				</ul>
			</div>
		</div>
	)
}
