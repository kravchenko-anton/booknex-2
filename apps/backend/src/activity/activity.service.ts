import { Injectable } from '@nestjs/common'
import { PrismaService } from '../utils/prisma.service'
import type { CreateActivityDto } from './dto/create-activity.dto'

@Injectable()
export class ActivityService {
	constructor(private readonly prisma: PrismaService) {}

	create(createActivityDto: CreateActivityDto) {
		return this.prisma.activity.create({
			data: createActivityDto
		})
	}
}
