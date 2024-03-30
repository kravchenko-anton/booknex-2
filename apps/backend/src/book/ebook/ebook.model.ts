import { ApiProperty, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsNumber,
	IsString,
	Validate,
	ValidateNested
} from 'class-validator'
import { ShortBook } from '../book.entity'

const htmlRegex = /<([A-Za-z][\dA-Za-z]*)\b[^>]*>(.*?)<\/\1>/

/* Payload */
export class Chapter {
	@ApiProperty({ type: Number })
	@IsNumber()
	id: number
	@ApiProperty({ type: String })
	@IsString()
	name: string

	@ApiProperty({ type: String })
	@IsString()
	@Validate((value: string) => htmlRegex.test(value), {
		message: 'Invalid HTML string'
	})
	text: string

	@ApiProperty({ type: String })
	@IsString()
	romanNumber: string

	@ApiProperty({ type: Number })
	@IsNumber()
	readingTime: number
}

export class PayloadChapter extends PickType(Chapter, ['id', 'name', 'text']) {}

export class EBookBase {
	@ApiProperty({ type: Number })
	@IsNumber()
	id: number

	@ApiProperty({ type: String })
	@Validate((value: string) => !value.includes('epub'), {
		message: 'Ebook cannot be an epub'
	})
	@IsString()
	title: string
}
export class StoredEBook extends EBookBase {
	@ApiProperty({ type: [Chapter] })
	@ValidateNested({ each: true })
	@IsArray()
	@ArrayMinSize(1)
	@Type(() => Chapter)
	chapters: Chapter[]
}

export class PayloadEBook extends EBookBase {
	@ApiProperty({ type: [PayloadChapter] })
	@IsArray()
	@ArrayMinSize(1)
	@Type(() => PayloadChapter)
	chapters: PayloadChapter[]
}

class OutputChapterChild {
	@ApiProperty({ example: 'name', description: 'chapter child name' })
	@IsString()
	name: string
	@ApiProperty({ example: 'link', description: 'chapter child link' })
	@IsString()
	link: string
}

class OutputChapter {
	@ApiProperty({ example: 'title', description: 'chapter title' })
	@IsString()
	title: string
	@ApiProperty({ type: [OutputChapterChild], description: 'chapter children' })
	@ValidateNested({ each: true })
	@Type(() => OutputChapterChild)
	children: OutputChapterChild[]
}

export class EbookOutput extends PickType(ShortBook, ['title', 'picture']) {
	@ApiProperty({ type: [String], description: 'book file' })
	@IsArray()
	@IsString({ each: true })
	file: string[]
	@ApiProperty({ type: [OutputChapter], description: 'book chapters' })
	@ValidateNested({ each: true })
	@Type(() => OutputChapter)
	chapters: OutputChapter[]
}
