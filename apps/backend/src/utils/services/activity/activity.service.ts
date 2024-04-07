import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import type { CreateActivityDto } from './dto/create-activity.dto'

@Injectable()
export class ActivityService {
	constructor(private readonly prisma: PrismaService) {}

	create(createActivityDto: CreateActivityDto) {
		return this.prisma.activity.create({
			data: {
				type: createActivityDto.type,
				importance: createActivityDto.importance,
				...(createActivityDto.userId && {
					user: {
						connect: {
							id: createActivityDto.userId
						}
					}
				}),
				...(createActivityDto.genreSlug && {
					genre: {
						connect: {
							slug: createActivityDto.genreSlug
						}
					}
				}),
				...(createActivityDto.bookSlug && {
					book: {
						connect: {
							slug: createActivityDto.bookSlug
						}
					}
				})
			}
		})
	}
}
