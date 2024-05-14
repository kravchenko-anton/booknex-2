import { Controller, Get, Param } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from '../../auth/decorators/auth.decorator'
import { CurrentUser } from '../../auth/decorators/user.decorator'
import { EbookOutput, StoredEBook } from './ebook.dto'
import { EbookService } from './ebook.service'

@Controller('ebook')
@ApiTags('📙 ebook')
export class EbookController {
	constructor(private readonly ebookService: EbookService) {}

	@Auth()
	@Get('/ebook/by-slug/:slug')
	@ApiOkResponse({ type: EbookOutput })
	async ebookBySlug(
		@Param('slug') bookSlug: string,
		@CurrentUser('id') userId: string
	): Promise<EbookOutput> {
		return this.ebookService.ebookBySlug(bookSlug, +userId)
	}

	//  admin
	@Auth('admin')
	@Get('/admin/stored-ebook/:slug')
	@ApiOkResponse({ type: [StoredEBook] })
	async storedEbookBySlug(
		@Param('slug') bookSlug: string
	): Promise<StoredEBook[]> {
		return this.ebookService.storedEbook(bookSlug)
	}
}
