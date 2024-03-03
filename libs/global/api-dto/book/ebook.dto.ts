import { IsNumber, IsString, Min, ValidateNested } from 'class-validator'
import type { EbookChapter as EbookChapterType } from '../../api-client/models/ebook-chapter'
import type { EBookType as EBookTypeType } from '../../api-client/models/ebook-type'

export class EbookChapterDto implements EbookChapterType {
	@IsNumber()
	@Min(1)
	id: number

	@IsString()
	name: string

	@IsString()
	text: string
}

export class EBookTypeDto implements EBookTypeType {
	@IsString()
	title: string

	@IsNumber()
	@Min(1)
	id: number
	@ValidateNested({ each: true })
	chapters: EbookChapterDto[]
}
