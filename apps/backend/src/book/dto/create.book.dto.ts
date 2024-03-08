import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsArray,
	IsNumber,
	ValidateNested
} from 'class-validator'
import { BaseBook, EBookType } from '../book.entity'

// extend book but remove genres
export class CreateBookDto extends BaseBook {
	@ApiProperty({ type: [EBookType] })
	@IsArray()
	@ValidateNested()
	@Type(() => EBookType)
	ebook: EBookType[]

	@IsArray()
	@ArrayMinSize(1)
	@ApiProperty({
		description: 'Array of genres',
		example: [1, 2, 3],
		type: [Number],
		required: true
	})
	@IsNumber({}, { each: true })
	genres: number[]
}
