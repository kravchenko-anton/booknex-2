interface SidebarProperties {
	open: boolean
	setOpen: (open: boolean) => void
}

const iconsList = [
	{
		label: "Statistic",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 12v5h12V8l-5 5-4-4Z"/></svg>
		),
		link: "/admin/dashboard"
	},
	{
		label: "Users",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
		),
		link: "/admin/user"
	},
	{
		label: "Books",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
		),
		link: "/admin/book"
	},
	{
		label: "Authors",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
		),
		link: "/admin/author"
	},
	{
		label: "Parser",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
		),
		link: "/admin/parser"
	},
	{
		label: "Shelfs",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="18" x="3" y="3" rx="1"/><path d="M7 3v18"/><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/></svg>
		),
		link: "/admin/shelf"
	}
]

export default function Sidebar({ open, setOpen }: SidebarProperties): JSX.Element {
	return (
			<div
				style={{
					height:  "calc(100vh - 70px)"
				}}
				className={`p-2 pb-4 z-0 bg-foreground ease-linear duration-100  ${open ? "md:w-14" : "md:w-32"} md:flex-col md:fixed md:justify-between md:flex`}
			>
				<div>
					<div className="hidden md:flex items-center justify-center">
						<button onClick={() => setOpen(!open)} style={{
							marginLeft: open ? "0" : "auto",
						}}>
							<svg
								className="w-6 h-6 text-white"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</button>
					</div>
					<div>
						<ul className="p-0  text-sm justify-between flex md:block">
							{
								iconsList.map((icon) => {
										return  <li className="rounded-sm w-full">
											<a
												href={icon.link}
												style={{ justifyContent: open ? "center" : "flex-start" }}
												className="flex items-center justify-center  p-2 hover:text-white ease-linear duration-100 rounded-md"
											>
												{ icon.icon }
												{
													!open && <span className="text-gray ml-2 ease-linear duration-100 hover:text-white hidden md:block">{icon.label}</span>
												}

											</a>
										</li>
								})
							}

						</ul>
					</div>
				</div>
						<a
							style={{ justifyContent: open ? "center" : "flex-start" }}
							className="flex items-center justify-center  p-2 hover:text-white ease-linear duration-100 rounded-md"
						>
							<svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
							{
								!open && <span className="text-gray ml-2 ease-linear duration-100 hover:text-white hidden md:block">Logout</span>
							}

						</a>
			</div>
	);
}
