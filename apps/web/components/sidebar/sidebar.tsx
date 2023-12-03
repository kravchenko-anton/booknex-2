import { usePathname } from 'next/navigation'
import {
	Book,
	Graph,
	Library,
	Logout,
	PenNib,
	Settings,
	User
} from '../../../../libs/global/icons/react'
import { useAction } from '../../hooks/useAction'

const iconsList = [
	{ icon: Graph, link: '/admin/dashboard' },
	{ icon: User, link: '/admin/users' },
	{ icon: Book, link: '/admin/books' },
	{ icon: PenNib, link: '/admin/authors' },
	{ icon: Settings, link: '/admin/parser' },
	{ icon: Library, link: '/admin/shelfs' }
]

export default function Sidebar(): JSX.Element {
	const { logout } = useAction()
	const activePath = usePathname()
	return (
		<div
			className={`bg-foreground z-0 p-2 pb-4  duration-100 ease-linear md:fixed md:h-[calc(100vh-70px)] md:flex-col`}>
			<div>
				<ul className='flex  justify-between p-0 text-sm md:block'>
					{iconsList.map(icon => {
						return (
							<li className='w-full rounded-sm' key={icon.link}>
								<a
									href={icon.link}
									className={`flex items-center justify-center  rounded-md p-2 duration-100 ease-linear hover:text-white ${
										activePath === icon.link ? 'bg-primary text-white' : ''
									}`}>
									<icon.icon width={30} height={30} />
								</a>
							</li>
						)
					})}
					<div
						onClick={() => logout()}
						className='text-danger flex cursor-pointer   items-center justify-center rounded-md p-2 duration-100 ease-linear'>
						<Logout width={30} height={30} />
					</div>
				</ul>
			</div>
		</div>
	)
}
