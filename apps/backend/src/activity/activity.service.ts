import type { CreateActivityDto } from '@/src/activity/activity.dto'
import { PrismaService } from '@/src/utils/services/prisma.service'
import { Injectable } from '@nestjs/common'

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
