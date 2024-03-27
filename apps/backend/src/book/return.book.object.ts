import type { Prisma } from '@prisma/client'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { defaultReturnObject } from '../utils/common/return.default.object'

export const returnBookObject: Pick<
	Prisma.BookSelect,
	'title' | 'picture' | 'author' | keyof typeof defaultReturnObject
> = {
	id: true,
	title: true,
	picture: true,
	author: true
}

export const infoByIdAdminReturnObject = (id: number) => ({
	where: { id },
	adminVisible: true,
	select: {
		createdAt: true,
		updatedAt: true,
		rating: true,
		readingTime: true,
		genres: { select: ReturnGenreObject },
		ebook: true,
		description: true,
		visible: true,
		review: {
			select: {
				...defaultReturnObject,
				tags: true,
				text: true,
				rating: true,
				user: {
					select: {
						id: true,
						email: true
					}
				}
			}
		},
		_count: {
			select: {
				finishedBy: true,
				readingBy: true,
				savedBy: true
			}
		},
		activities: {
			select: {
				type: true,
				id: true,
				importance: true,
				createdAt: true,
				genreId: true,
				bookId: true,
				userId: true
			}
		}
	}
})

export const catalogReturnObject = ({
	perPage,
	page,
	searchTerm
}: {
	perPage: number
	page?: number
	searchTerm?: string
}) => ({
	take: perPage,
	adminVisible: true,
	select: {
		genres: { select: ReturnGenreObject },
		readingTime: true,
		rating: true,
		visible: true,
		description: true,
		mainGenre: {
			select: ReturnGenreObject
		}
	},
	orderBy: {
		visible: 'asc' as const
	},
	...(page && {
		skip: page * perPage
	}),
	...(searchTerm && {
		where: {
			title: {
				contains: searchTerm
			}
		},
		...(!Number.isNaN(+searchTerm) && {
			where: {
				id: +searchTerm
			}
		})
	})
})
