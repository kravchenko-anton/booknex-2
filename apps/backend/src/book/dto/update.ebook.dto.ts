import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsString, Min, ValidateNested } from 'class-validator'

export class EbookChapter {
	@ApiProperty({ type: Number })
	@IsNumber()
	@Min(1)
	id: number

	@ApiProperty({ type: String })
	@IsString()
	name: string

	@ApiProperty({ type: String })
	@IsString()
	text: string
}

export class EBookType {
	@ApiProperty({ type: String })
	@IsString()
	title: string

	@ApiProperty({ type: Number })
	@IsNumber()
	@Min(1)
	id: number
	@ApiProperty({ type: [EbookChapter] })
	@ValidateNested({ each: true })
	@Type(() => EbookChapter)
	chapters: EbookChapter[]
}
