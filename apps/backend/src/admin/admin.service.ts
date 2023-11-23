import { Injectable } from '@nestjs/common'
import { PrismaService } from '../utils/prisma.service'

@Injectable()
export class AdminService {
	constructor(private readonly prisma: PrismaService) {}
	async statistics() {

		return {
			totalUsers: await this.prisma.user.count(),
		}
	}
}
