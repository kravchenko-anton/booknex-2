import {
	Body,
	Controller,
	Delete,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOkResponse,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import { Auth } from '../auth/decorators/auth.decorator'

import { ParserDto } from './dto/parser.dto'
import { BookTemplate } from './parser.entity'
import { BookTemplateCatalogOutput, UnfoldOutput } from './parser.model'
import { ParserService } from './parser.service'

@Auth('admin')
@ApiTags('📦 parser')
@ApiBearerAuth()
@Controller('parser')
export class ParserController {
	constructor(private readonly parserService: ParserService) {}

	@Get('admin/catalog')
	@ApiOkResponse({ type: BookTemplateCatalogOutput })
	@ApiQuery({ name: 'searchTerm', required: false, example: 'The Hobbit' })
	@ApiQuery({ name: 'page', required: false, example: 1 })
	async catalog(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<BookTemplateCatalogOutput> {
		return this.parserService.catalog(searchTerm, page || 1)
	}

	@Get('admin/by-id/:id')
	@ApiOkResponse({ type: BookTemplate })
	byId(@Param('id') id: number): Promise<BookTemplate> {
		return this.parserService.byId(+id)
	}

	@Post('admin/parse')
	@ApiBody({ type: ParserDto })
	async parse(@Body() dto: ParserDto) {
		return this.parserService.parse(dto)
	}

	@Post('admin/unfold')
	@ApiOkResponse({
		type: UnfoldOutput,
		description: 'Unfolded book content',
		isArray: true
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@UseInterceptors(FileInterceptor('file'))
	async unfold(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 10_000_000_000
					})
				]
			})
		)
		file: Express.Multer.File
	): Promise<UnfoldOutput[]> {
		return this.parserService.unfold(file)
	}

	@Delete('admin/remove/:id')
	async remove(@Param('id') id: number) {
		return this.parserService.remove(+id)
	}
}
