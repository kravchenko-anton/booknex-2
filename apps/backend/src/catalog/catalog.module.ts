import { Module } from '@nestjs/common'
import { PrismaService } from '../utils/prisma.service'
import { CatalogController } from './catalog.controller'
import { CatalogService } from './catalog.service'

@Module({
	controllers: [CatalogController],
	providers: [CatalogService, PrismaService]
})
export class CatalogModule {}
