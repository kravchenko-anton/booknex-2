import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { randomColor, shadeRGBColor } from '../utils/color.functions'
import { ErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import type { CreateAuthorDto, EditAuthorDto } from './dto/manipulation.author.dto'
import { returnAuthorObject, returnAuthorObjectWithDescription } from './return.author.object'

@Injectable()
export class AuthorService {
	constructor(private prisma: PrismaService) {}
	async getAuthorById(id: number, selectObject: Prisma.AuthorSelect = {}) {
		const author = await this.prisma.author.findUnique({
			where: { id },
			select: {
				...returnAuthorObject,
				...selectObject
			}
		})
		if (!author) throw new NotFoundException(`Author ${ErrorsEnum.Not_Found}`).getResponse()
		return author
	}

	async all(searchTerm: string) {
		return this.prisma.author.findMany({
			select: returnAuthorObjectWithDescription,
			take: 20,
			...(searchTerm && {
				where: {
					name: {
						contains: searchTerm
					}
				}
			}),
		})
	}

	async create(dto: CreateAuthorDto) {
		await this.prisma.author.create({
			data: {
				name: dto.name,
				picture: dto.picture,
				color: shadeRGBColor(randomColor(), -50),
				description: dto.description,
				books: {
					connect: dto.books.map(id => ({ id }))
				}
			}
		})
	}

	async delete(id: number) {
		const author = await this.getAuthorById(id, {
			books: {
				select: {
					id: true
				}
			}
		})
		if (author.books.length > 0)
			throw new BadRequestException('Author has books, cannot delete').getResponse()
		return this.prisma.author.delete({ where: { id } })
	}

	async update(id: number, dto: EditAuthorDto) {
		const author = await this.getAuthorById(id)
		await this.prisma.author.update({
			where: { id: author.id },
			data: {
				name: dto.name || author.name,
				picture: dto.picture || author.picture,
				description: dto.description || author.description,
				books: {
					connect: dto.books.map(BookId => ({ id: BookId }))
				}
			}
		})
	}
}
