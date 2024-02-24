import { Controller, Get, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { ShortBook } from '../book/book.model'
import { featuredOutput } from './catalog.model'

import { CatalogService } from './catalog.service'

@Auth()
@ApiTags('catalog')
@ApiBearerAuth()
@Controller('catalog')
export class CatalogController {
	constructor(private readonly catalogService: CatalogService) {}

	@Get('/search/:query')
	@ApiOkResponse({ type: [ShortBook] })
	async search(@Param('query') query: string): Promise<ShortBook[]> {
		return this.catalogService.search(query)
	}

	@Get('/featured')
	@ApiOkResponse({ type: featuredOutput })
	async featured(@CurrentUser('id') userId: number): Promise<featuredOutput> {
		return this.catalogService.featured(+userId)
	}
}
