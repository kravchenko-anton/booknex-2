import { Controller, Get, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger'
import type {
	FeaturedOutput,
	SearchOutput
} from '../../../../libs/global/services-types/catalog.types'
import { Auth } from '../decorator/auth.decorator'
import { CurrentUser } from '../decorator/user.decorator'

import { CatalogService } from './catalog.service'

@Auth()
@ApiTags('catalog')
@ApiBearerAuth()
@Controller('catalog')
export class CatalogController {
	constructor(private readonly catalogService: CatalogService) {}

	@Get('/search/:query')
	@ApiParam({ name: 'query' })
	async search(@Param('query') query: string): Promise<SearchOutput> {
		return this.catalogService.search(query)
	}

	@Get('/featured')
	async featured(@CurrentUser('id') userId: number): Promise<FeaturedOutput> {
		return this.catalogService.featured(+userId)
	}
}
