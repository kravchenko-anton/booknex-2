import { IsNumber, IsOptional, IsString } from 'class-validator'

interface CollectionDtoPayload {
	title: string
	picture: string
	books: number[]
}
export class UpdateCollectionDto implements Partial<CollectionDtoPayload> {
	@IsOptional() @IsString() title: string
	@IsOptional() @IsString() picture: string
	@IsOptional() @IsString() icon: string
	@IsOptional() @IsNumber({}, { each: true }) books: number[]
}
export class CreateCollectionDto implements CollectionDtoPayload {
	@IsString() title: string
	@IsString() picture: string
	@IsNumber({}, { each: true }) books: number[]
}
