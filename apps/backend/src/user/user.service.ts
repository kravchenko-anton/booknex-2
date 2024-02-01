import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { hash, verify } from 'argon2'
import { returnBookObject } from '../book/return.book.object'
import { ReturnGenreObject } from '../genre/return.genre.object'
import { ErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import type {
	UserUpdatePasswordDto,
	UserUpdateSelectedGenresDto
} from './dto/user.update.dto'
import { returnUserObject } from './return.user.object'
import { ActivityEnum, UserLibraryFieldsEnum, idSelect } from './user.types'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUserById(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: {
				...returnUserObject,
				...selectObject
			}
		})
		if (!user)
			throw new NotFoundException(`User ${ErrorsEnum.Not_Found}`).getResponse()
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
			throw new NotFoundException(`User ${ErrorsEnum.Not_Found}`).getResponse()
		return {
			[UserLibraryFieldsEnum.readingBooks]: library.readingBooks,
			[UserLibraryFieldsEnum.finishedBooks]: library.finishedBooks,
			[UserLibraryFieldsEnum.savedBooks]: library.savedBooks
		}
	}

	async updateRecommendations(id: number, dto: UserUpdateSelectedGenresDto) {
		await this.getUserById(id)
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
		await this.prisma.activity.create({
			data: {
				type: ActivityEnum.Update_Recommendations,
				importance: 5,
				user: {
					connect: {
						id
					}
				}
			}
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

	async updatePassword(userId: number, dto: UserUpdatePasswordDto) {
		const user = await this.getUserById(userId, {
			password: true
		})
		const isPasswordValid = await verify(user.password, dto.oldPassword)
		if (!isPasswordValid)
			throw new BadRequestException(ErrorsEnum.Invalid_Value).getResponse()
		await this.prisma.user.update({
			where: { id: userId },
			data: {
				password: await hash(dto.password)
			}
		})
	}

	async all(searchTerm: string, page: number) {
		const perPage = 20
		return {
			data: await this.prisma.user.findMany({
				take: perPage,

				select: {
					...returnUserObject,
					selectedGenres: {
						select: ReturnGenreObject
					},
					_count: {
						select: {
							activity: true,
							savedBooks: true,
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
			}),
			canLoadMore:
				page < Math.floor((await this.prisma.user.count()) / perPage),
			totalPages: Math.floor((await this.prisma.user.count()) / perPage)
		}
	}

	async delete(id: number) {
		const user = await this.getUserById(id)
		await this.prisma.user.delete({
			where: { id: user.id }
		})
	}

	async startReading(userId: number, id: number) {
		const bookExist = await this.prisma.book.findUnique({
			where: { id },
			select: {
				id: true
			}
		})

		if (!bookExist)
			throw new NotFoundException(`Book ${ErrorsEnum.Not_Found}`).getResponse()
		const user = await this.getUserById(+userId, {
			readingBooks: idSelect,
			finishedBooks: idSelect
		})

		const isReadingExist = user.readingBooks.some(book => book.id === id)
		if (isReadingExist) return

		await this.prisma.activity.create({
			data: {
				type: ActivityEnum.Started_Reading,
				importance: 2,
				user: {
					connect: {
						id: userId
					}
				},
				book: {
					connect: {
						id
					}
				}
			}
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
		const bookExist = await this.prisma.book.findUnique({
			where: { id },
			select: {
				id: true
			}
		})

		if (!bookExist)
			throw new NotFoundException(`Book ${ErrorsEnum.Not_Found}`).getResponse()
		const user = await this.getUserById(+userId, {
			readingBooks: idSelect
		})
		const isReadingExist = user.readingBooks.some(book => book.id === id)
		if (!isReadingExist) return
		await this.prisma.activity.create({
			data: {
				type: ActivityEnum.Finished_Reading,
				importance: 3,
				user: {
					connect: {
						id: userId
					}
				},
				book: {
					connect: {
						id
					}
				}
			}
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
		const bookExist = await this.prisma.book.findUnique({
			where: { id },
			select: {
				id: true
			}
		})

		if (!bookExist) return false
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				savedBooks: idSelect
			}
		})
		if (!user) throw new NotFoundException(`User ${ErrorsEnum.Not_Found}`)
		return user.savedBooks.some(book => book.id === id)
	}

	async toggleSave(userId: number, id: number) {
		const bookExist = await this.prisma.book.findUnique({
			where: { id },
			select: {
				id: true
			}
		})

		if (!bookExist) throw new NotFoundException(`Book ${ErrorsEnum.Not_Found}`)
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				savedBooks: idSelect
			}
		})
		if (!user) throw new NotFoundException(`User ${ErrorsEnum.Not_Found}`)
		const isSavedExist = user.savedBooks.some(book => book.id === id)
		await this.prisma.activity.create({
			data: {
				type: isSavedExist
					? ActivityEnum.Remove_From_Saved
					: ActivityEnum.Add_To_Saved,
				importance: 1,
				user: {
					connect: {
						id: user.id
					}
				},
				book: {
					connect: {
						id
					}
				}
			}
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
}
