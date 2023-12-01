import { Book, Graph, Library, Logout, PenNib, Settings, User } from '../../../../libs/global/icons/react'
import { useAction } from '../../hooks/useAction'

const iconsList = [
	{ icon: Graph,
		link: "/admin/dashboard"
	},
	{ icon: User,
		link: "/admin/users"
	},
	{ icon: Book,
		link: "/admin/books"
	},
	{ icon: PenNib,
		link: "/admin/authors"
	},
	{ icon: Settings,
		link: "/admin/parser"
	},
	{ icon: Library,
		link: "/admin/shelfs"
	}
]

export default function Sidebar(): JSX.Element {
	const { logout } = useAction()
	return (
			<div className={`p-2 pb-4 z-0 bg-foreground  ease-linear duration-100 md:flex-col md:fixed md:h-[calc(100vh-70px)]`}>
					<div>
						<ul className="p-0  text-sm justify-between flex md:block">
							{
								iconsList.map((icon) => {
										return  <li className="rounded-sm w-full">
											<a
												href={icon.link}
												className="flex items-center justify-center  p-2 hover:text-white ease-linear duration-100 rounded-md"
											>
                        <icon.icon />
											</a>
										</li>
								})
							}
							<div
								onClick={() => logout()}
 								className="flex items-center justify-center  text-danger p-2 cursor-pointer ease-linear duration-100 rounded-md">
                <Logout />
							</div>
						</ul>
					</div>

			</div>
	);
}
