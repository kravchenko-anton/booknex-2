import { PickType } from '@nestjs/swagger'
import { UpdateBookDto } from './dto/update.book.dto'

export class UpdateBookDtoExtended extends PickType(UpdateBookDto, [
	'title',
	'description',
	'visible',
	'author',
	'picture',
	'rating'
]) {
	ebook?: string
	readingTime?: number
	chapters?: number
	genres?: { set: { id: number }[] }
	mainGenre?: { connect: { id: number } }
}
