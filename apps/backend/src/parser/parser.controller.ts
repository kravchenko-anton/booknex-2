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
import type {
	AllGoodReadBookOutput,
	ByIdOutput,
	UnfoldOutput
} from '../../../../libs/global/services-types/parser-types'
import { Auth } from '../decorator/auth.decorator'
import { ParserDto } from './dto/parser.dto'
import { ParserService } from './parser.service'

@Auth('admin')
@Controller('parser')
export class ParserController {
	constructor(private readonly parserService: ParserService) {}

	@Get('admin/all')
	async all(
		@Query('searchTerm') searchTerm: string,
		@Query('page') page: number
	): Promise<AllGoodReadBookOutput> {
		return this.parserService.all(searchTerm, page || 1)
	}

	@Post('admin/parse')
	async parse(@Body() dto: ParserDto) {
		return this.parserService.parse(dto)
	}

	@Get('admin/by-id/:id')
	byId(@Param('id') id: string): Promise<ByIdOutput> {
		return this.parserService.byId(+id)
	}

	@Post('admin/unfold')
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
	async delete(@Param('id') id: string) {
		return this.parserService.delete(+id)
	}
}
