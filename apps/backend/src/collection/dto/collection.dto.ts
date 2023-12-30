import { IsNumber, IsOptional, IsString } from 'class-validator'

interface ShelfDtoPayload {
	title: string
	picture: string
	books: number[]
}
export class UpdateShelfDto implements Partial<ShelfDtoPayload> {
	@IsOptional() @IsString() title: string
	@IsOptional() @IsString() picture: string
	@IsOptional() @IsString() icon: string
	@IsOptional() @IsNumber({}, { each: true }) books: number[]
}
export class CreateShelfDto implements ShelfDtoPayload {
	@IsString() title: string
	@IsString() picture: string
	@IsNumber({}, { each: true }) books: number[]
}
