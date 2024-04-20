export const QueryKeys = {
	library: ['user-library'],
	featured: ['featured'],
	recommendationGenres: ['recommendation-genres'],
	searchByTerm: (searchTerm: string) => ['search-by-term', searchTerm],

	book: {
		picksOfTheWeek: ['picks-of-the-week'],
		key: ['book'],
		infoBySlug: (slug: string) => ['book', slug],
		adminInfoBySlug: (slug: string) => ['admin-info-by-slug', slug],
		isSaved: (slug: string) => ['is-saved-book', slug],
		overview: {
			key: ['book-overview'],
			bySlug: (slug: string) => ['book-overview', slug]
		},
		updateInfo: {
			key: ['book-update-info'],
			bySlug: (slug: string) => ['book-update-info', slug]
		},
		catalog: (searchTerm: string, page: number) => [
			'books-catalog',
			searchTerm,
			page
		]
	},

	genres: {
		key: ['genres'],
		bySlug: (slug: string) => ['genre', slug]
	},

	ebook: {
		key: ['ebook'],
		bySlug: (slug: string) => ['ebook', slug],
		storedEbookBySlug: (slug: string) => ['stored-ebook', slug]
	},

	bookTemplate: {
		key: ['book-template'],
		bySlug: (slug: string) => ['book-template', slug],
		catalog: {
			key: ['book-templates-catalog'],
			action: (searchTerm: string, page: number) => [
				'book-template-catalog',
				searchTerm,
				page
			]
		}
	},

	users: {
		catalog: {
			key: ['users-catalog'],
			action: (searchTerm: string, page: number) => [
				'users-catalog',
				searchTerm,
				page
			]
		}
	}
}

export const MutationKeys = {
	book: {
		update: ['update-book'],
		startReadingBySlug: (slug: string) => ['start-reading', slug],
		toggleSaveBySlug: (slug: string) => ['toggle-save', slug],
		finishReadingBySlug: (slug: string) => ['finish-reading', slug],
		removeBook: ['remove-book'],
		createBook: ['create-book']
	},
	review: {
		sendReview: ['send-review']
	},
	bookTemplate: {
		unfold: ['unfold'],
		parse: ['parse-template'],
		deleteTemplate: ['delete-template']
	},
	recommendation: {
		update: ['update-recommendation']
	},
	user: {
		remove: ['remove-user']
	},
	storage: {
		uploadFile: ['upload-file']
	}
}
