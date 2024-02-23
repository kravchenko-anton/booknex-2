import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities, type Prisma } from '@prisma/client'
import { returnBookObject } from '../book/return.book.object'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { GlobalErrorsEnum } from '../utils/common/errors'
import { idSelect } from '../utils/common/return.default.object'
import { transformActivity } from '../utils/helpers/activity-transformer'
import { serverError } from '../utils/helpers/call-error'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'
import type { UserUpdateSelectedGenresDto } from './dto/update-selected-genres.dto'
import { returnUserObject } from './return.user.object'

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly activityService: ActivityService
	) {}

	async getUserById(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: {
				...returnUserObject,
				...selectObject
			}
		})
		if (!user)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
		return user
	}

	async library(id: number) {
		const library = await this.prisma.user.findUnique({
			where: { id },
			select: {
				readingBooks: {
					select: returnBookObject
				},
				finishedBooks: {
					select: returnBookObject
				},
				savedBooks: {
					select: returnBookObject
				}
			}
		})
		if (!library)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
		const { readingBooks, finishedBooks, savedBooks } = library
		return {
			readingBooks,
			finishedBooks,
			savedBooks
		}
	}

	recommendationGenres(userId: number) {
		return this.prisma.user
			.findUnique({
				where: {
					id: userId
				},
				select: {
					selectedGenres: {
						select: {
							id: true,
							name: true
						}
					}
				}
			})
			.selectedGenres()
	}
	async updateRecommendations(id: number, dto: UserUpdateSelectedGenresDto) {
		await this.getUserById(id)
		console.log(dto.selectedGenres)
		const selectedGenres = await this.prisma.genre.findMany({
			where: {
				id: {
					in: dto.selectedGenres
				}
			},
			select: {
				id: true
			}
		})

		await this.activityService.create({
			type: Activities.updateRecommendations,
			importance: 5,
			userId: id
		})

		await this.prisma.user.update({
			where: { id },
			data: {
				selectedGenres: {
					set: selectedGenres
				}
			}
		})
	}

	async profile(id: number) {
		const user = await this.getUserById(id, {
			...returnUserObject
		})

		const {
			_count: { id: bookCount },
			_sum: { pages: totalPageCount }
		} = await this.prisma.book.aggregate({
			where: { finishedBy: { some: { id } } },
			_count: { id: true },
			_sum: { pages: true }
		})

		return {
			...user,
			bookCount: bookCount ?? 0,
			totalPageCount: totalPageCount ?? 0
		}
	}

	async all(searchTerm: string, page: number) {
		const perPage = 20
		const data = await this.prisma.user.findMany({
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
				activity: {
					select: {
						type: true,
						id: true,
						importance: true,
						createdAt: true,
						userId: true,
						bookId: true,
						genreId: true
					}
				},
				_count: {
					select: {
						savedBooks: true,
						review: true,
						finishedBooks: true,
						readingBooks: true
					}
				},
				...(searchTerm && {
					where: {
						title: {
							contains: searchTerm
						}
					}
				})
			},
			...(page && {
				skip: page * perPage
			})
		})
		return {
			data: data.map(({ activity, ...user }) => ({
				...user,
				activities: transformActivity(activity)
			})),
			canLoadMore:
				page < Math.floor((await this.prisma.user.count()) / perPage),
			totalPages: Math.floor((await this.prisma.user.count()) / perPage)
		}
	}

	async remove(id: number) {
		const user = await this.getUserById(id)
		await this.prisma.user.delete({
			where: { id: user.id }
		})
	}

	async startReading(userId: number, id: number) {
		await this.checkBookExist(id)
		const user = await this.getUserById(+userId, {
			readingBooks: idSelect,
			finishedBooks: idSelect
		})

		const isReadingExist = user.readingBooks.some(book => book.id === id)
		if (isReadingExist) return

		await this.activityService.create({
			type: Activities.startedReading,
			importance: 2,
			userId,
			bookId: id
		})
		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				readingBooks: {
					connect: {
						id
					}
				},
				savedBooks: {
					disconnect: {
						id
					}
				},
				finishedBooks: {
					disconnect: {
						id
					}
				}
			}
		})
	}

	async finishReading(userId: number, id: number) {
		await this.checkBookExist(id)
		const user = await this.getUserById(+userId, {
			readingBooks: idSelect
		})
		const isReadingExist = user.readingBooks.some(book => book.id === id)
		if (!isReadingExist) return

		await this.activityService.create({
			type: Activities.finishedReading,
			importance: 3,
			userId,
			bookId: id
		})

		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				readingBooks: {
					disconnect: {
						id
					}
				},
				savedBooks: {
					disconnect: {
						id
					}
				},
				finishedBooks: {
					connect: {
						id
					}
				}
			}
		})
	}

	async isSaved(userId: number, id: number) {
		await this.checkBookExist(id)
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				savedBooks: idSelect
			}
		})
		if (!user)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
		return user.savedBooks.some(book => book.id === id)
	}

	async toggleSave(userId: number, id: number) {
		await this.checkBookExist(id)
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				savedBooks: idSelect
			}
		})
		if (!user)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
		const isSavedExist = user.savedBooks.some(book => book.id === id)

		await this.activityService.create({
			type: isSavedExist ? Activities.removeFromSaved : Activities.savedBook,
			importance: 1,
			userId,
			bookId: id
		})
		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				savedBooks: {
					[isSavedExist ? 'disconnect' : 'connect']: {
						id
					}
				},
				...(!isSavedExist && {
					readingBooks: {
						disconnect: {
							id
						}
					},
					finishedBooks: {
						disconnect: {
							id
						}
					}
				})
			}
		})

		return !isSavedExist
	}

	private async checkBookExist(id: number) {
		const book = await this.prisma.book.findUnique({
			where: { id, visible: true },
			select: {
				id: true
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, GlobalErrorsEnum.somethingWrong)
		return !!book
	}
}
