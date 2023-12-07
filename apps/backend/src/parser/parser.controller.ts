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
import type { AllGoodReadBookOutput } from '../../../../libs/global/services-types/parser-types'
import { Auth } from '../decorator/auth.decorator'
import { ParserDto } from './dto/parser.dto'
import { ParserService } from './parser.service'

@Auth('admin')
@Controller('parser')
export class ParserController {
	constructor(private readonly parserService: ParserService) {}

	@Get('/all')
	async all(
		@Query('searchTerm') searchTerm: string
	): Promise<AllGoodReadBookOutput> {
		return this.parserService.all(searchTerm)
	}

	@Post('/parse')
	async parse(@Body() dto: ParserDto) {
		return this.parserService.parse(dto)
	}

	@Post('/unfold')
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
	) {
		return this.parserService.unfold(file)
	}

	@Delete('/delete/:id')
	async delete(@Param('id') id: string) {
		return this.parserService.delete(+id)
	}
}
