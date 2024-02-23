import { Controller, Get, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'

import { CatalogService } from './catalog.service'

@Auth()
@ApiTags('catalog')
@ApiBearerAuth()
@Controller('catalog')
export class CatalogController {
	constructor(private readonly catalogService: CatalogService) {}

	@Get('/search/:query')
	async search(@Param('query') query: string) {
		return this.catalogService.search(query)
	}

	@Get('/featured')
	async featured(@CurrentUser('id') userId: number) {
		return this.catalogService.featured(+userId)
	}
}
