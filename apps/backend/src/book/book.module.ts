import { Module } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { PrismaService } from '../utils/prisma.service'
import { BookController } from './book.controller'
import { BookService } from './book.service'

@Module({
	controllers: [BookController],
	providers: [BookService, PrismaService, UserService]
})
export class BookModule {}
