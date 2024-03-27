import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber } from 'class-validator'

export class BaseCatalogModel {
	@ApiProperty({ example: true, description: 'can load more', type: Boolean })
	@IsBoolean()
	canLoadMore: boolean
	@ApiProperty({ example: 1, description: 'total pages', type: Number })
	@IsNumber()
	totalPages: number
}
