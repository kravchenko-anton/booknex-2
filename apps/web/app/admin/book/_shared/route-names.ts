export const bookRoute = '/admin/book'
export const bookCatalogRoute = bookRoute + '/catalog'
export const parserRoute = '/admin/parser'
export const parserCatalogRoute = parserRoute

export const userRoute = '/admin/user'
export const userCatalogRoute = userRoute + '/catalog'

export const secureRoutes = {
	bookRoute,
	bookCatalogRoute,
	parserRoute,
	parserCatalogRoute,
	userRoute,
	userCatalogRoute,
	dashboard: '/admin/dashboard'
}

export const publicRoutes = {
	login: '/login'
}
