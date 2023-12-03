import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query
} from '@nestjs/common'
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

	@Delete('/delete/:id')
	async delete(@Param('id') id: string) {
		return this.parserService.delete(+id)
	}
}
