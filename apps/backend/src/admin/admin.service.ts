import { Injectable } from '@nestjs/common'
import { returnBookObjectWithAuthor } from '../book/return.book.object'
import { PrismaService } from '../utils/prisma.service'

@Injectable()
export class AdminService {
	constructor(private readonly prisma: PrismaService) {}
	async statistics() {
		const totalTimeRead = await this.prisma.history.aggregate({
			_sum: {
				time: true
			}
		})
		return {
			totalUsers: await this.prisma.user.count(),
			totalReadTime: totalTimeRead._sum.time,
			mostReadBook: await this.prisma.book.findMany({
				take: 2,
				select: returnBookObjectWithAuthor,
				orderBy: {
					histories: {
						_count: 'desc'
					}
				}
			})
		}
	}
}
