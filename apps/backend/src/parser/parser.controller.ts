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
	ApiParam,
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import type {
	AllGoodReadBookOutput,
	ByIdOutput,
	UnfoldOutput
} from '../../../../libs/global/services-types/parser-types'
import { Auth } from '../decorator/auth.decorator'
import { ParserDto } from './dto/parser.dto'
import { ParserService } from './parser.service'

@Auth('admin')
@ApiTags('parser')
@ApiBearerAuth()
@Controller('parser')
export class ParserController {
	constructor(private readonly parserService: ParserService) {}

	@Get('admin/all')
	@ApiQuery({ name: 'searchTerm', required: false, example: 'The Hobbit' })
	@ApiQuery({ name: 'page', required: false, example: 1 })
	async all(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<AllGoodReadBookOutput> {
		return this.parserService.all(searchTerm, page || 1)
	}

	@Get('admin/by-id/:id')
	@ApiParam({ name: 'id', required: false, example: 1 })
	byId(@Param('id') id: string): Promise<ByIdOutput | null> {
		return this.parserService.byId(+id)
	}

	@Post('admin/parse')
	@ApiBody({ type: ParserDto })
	async parse(@Body() dto: ParserDto) {
		return this.parserService.parse(dto)
	}

	@Post('admin/unfold')
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'epub'
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
	): Promise<UnfoldOutput> {
		return this.parserService.unfold(file)
	}

	@Delete('admin/delete/:id')
	@ApiParam({ name: 'id', required: false, example: 1 })
	async delete(@Param('id') id: string) {
		return this.parserService.delete(+id)
	}
}
