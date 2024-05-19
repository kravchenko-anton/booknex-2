import { returnBookObject } from '@/src/book/return.book.object'
import { ReturnGenreObject } from '@/src/genre/return.genre.object'
import { returnUserObject } from '@/src/user/return.user.object'

export const userLibraryFields = (userId: number) =>
	({
		where: { id: userId },
		select: {
			readingBooks: {
				select: {
					...returnBookObject,
					readingHistory: {
						select: {
							id: true,
							scrollPosition: true,
							endProgress: true,
							endDate: true
						},
						orderBy: {
							endDate: 'desc'
						},
						take: 1
					}
				},
				where: {
					isPublic: true
				}
			},
			finishedBooks: {
				select: returnBookObject,
				where: {
					isPublic: true
				}
			},
			savedBooks: {
				select: returnBookObject,
				where: {
					isPublic: true
				}
			}
		}
	}) as const

export const userCatalogFields = ({
	page,
	perPage,
	searchTerm
}: {
	page: number
	perPage: number
	searchTerm: string
}) =>
	({
		take: perPage,
		select: {
			...returnUserObject,
			picture: true,
			socialId: true,
			role: true,
			createdAt: true,
			fullName: true,
			location: true,
			selectedGenres: {
				select: ReturnGenreObject
			},
			readingHistory: {
				orderBy: {
					endDate: 'asc'
				},
				select: {
					endDate: true,
					progressDelta: true,
					readingTimeMs: true,
					scrollPosition: true,
					startDate: true,
					book: {
						select: {
							pagesCount: true
						}
					}
				}
			},
			_count: {
				select: {
					savedBooks: true,
					review: true,
					finishedBooks: true,
					readingBooks: true
				}
			}
		},

		...(page && {
			skip: page * perPage
		}),
		...(searchTerm && {
			where: {
				fullName: {
					contains: searchTerm
				}
			},
			...(!Number.isNaN(+searchTerm) && {
				where: {
					id: +searchTerm
				}
			})
		})
	}) as const

export const userFinishReadingBookFields = (slug: string) =>
	({
		readingBooks: {
			disconnect: {
				slug
			}
		},
		savedBooks: {
			disconnect: {
				slug
			}
		},
		finishedBooks: {
			connect: {
				slug
			}
		}
	}) as const

export const userStartReadingBookFields = (slug: string) =>
	({
		readingBooks: {
			connect: {
				slug
			}
		},
		savedBooks: {
			disconnect: {
				slug
			}
		},
		finishedBooks: {
			disconnect: {
				slug
			}
		}
	}) as const

export const userToggleSaveFields = ({
	isSavedExist,
	slug
}: {
	isSavedExist: boolean
	slug: string
}) => ({
	savedBooks: {
		[isSavedExist ? 'disconnect' : 'connect']: {
			slug
		}
	},
	...(!isSavedExist && {
		readingBooks: {
			disconnect: {
				slug
			}
		},
		finishedBooks: {
			disconnect: {
				slug
			}
		}
	})
})
