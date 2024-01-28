import { Injectable } from '@nestjs/common'
import { PrismaService } from '../utils/prisma.service'

@Injectable()
export class AdminService {
	constructor(private readonly prisma: PrismaService) {}
	async dashboard() {
		// дейли трафик, статистика регистации по дням, самые активные книги, самые активные пользователи и авторы и статистика, и жанры
		return {
			totalUsers: await this.prisma.user.count(),
			totalBooks: await this.prisma.book.count(),
			totalGenres: await this.prisma.genre.count()
		}
	}
}
