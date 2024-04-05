import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'
import { BaseCatalogModel } from '../utils/common/base-catalog.model'
import { Book } from './book.entity'

export class CatalogOutput extends BaseCatalogModel {
	@ApiProperty({ type: [Book] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Book)
	data: Book[]
}
