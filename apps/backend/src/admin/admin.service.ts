import { Injectable } from '@nestjs/common'
import { ActivityEnum } from '../user/user.types'
import { PrismaService } from '../utils/prisma.service'

@Injectable()
export class AdminService {
	constructor(private readonly prisma: PrismaService) {}
	async statistics() {
		// дейли трафик, статистика регистации по дням, самые активные книги, самые активные пользователи и авторы и статистика, и жанры
		return {
			totalUsers: await this.prisma.user.count(),
			VisitsAppByMonthInYear: await this.prisma.activity
				.groupBy({
					where: {
						type: ActivityEnum.Visit_App
					},
					by: ['createdAt'],
					_count: {
						createdAt: true
					}
				})
				.then(data => {
					// divided into months in years, like June 2023, etc.
				})
		}
	}
}
