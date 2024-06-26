export const secureRoutes = {
	bookCatalogRoute: '/admin/book' + '/catalog',
	bookCreateRoute: '/admin/book' + '/create',
	bookCreateWithTemplateRoute: (slug: string) =>
		'/admin/book' + '/create?template=' + slug,
	bookUpdateRoute: (slug: string) => '/admin/book/' + slug + '/update',
	bookOverviewRoute: (slug: string) => '/admin/book/' + slug,
	parserCatalogRoute: '/admin/parser' + '/catalog',
	userCatalogRoute: '/admin/user' + '/catalog'
}

export const publicRoutes = {
	login: '/login',
	dashboard: '/admin/dashboard',
	bookBySlug: (slug: string) => '/book/' + slug
}
