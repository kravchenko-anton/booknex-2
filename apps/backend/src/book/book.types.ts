import { PickType } from '@nestjs/swagger'
import { UpdateBookDto } from './dto/update.book.dto'

export class UpdateBookDtoExtended extends PickType(UpdateBookDto, [
	'title',
	'description',
	'isPublic',
	'author',
	'picture',
	'rating'
]) {
	ebook?: string
	slug?: string
	readingTime?: number
	chapters?: number
	genres?: { set: { slug: string }[] }
	mainGenre?: { connect: { slug: string } }
}
