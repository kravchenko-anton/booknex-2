export const secureRoutes = {
	bookCatalogRoute: '/admin/book' + '/catalog',
	bookCreateRoute: '/admin/book' + '/create',
	bookCreateWithTemplateRoute: (id: number) =>
		'/admin/book' + '/create?template=' + id,
	bookEditRoute: (id: number) => '/admin/book/' + id + '/edit',
	bookOverviewRoute: (id: number) => '/admin/book/' + id,
	parserCatalogRoute: '/admin/parser' + '/catalog',
	userCatalogRoute: '/admin/user' + '/catalog',
	dashboard: '/admin/dashboard'
}

export const publicRoutes = {
	login: '/login'
}
