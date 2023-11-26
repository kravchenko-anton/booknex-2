import { IsArray, IsOptional, IsString } from 'class-validator'
import type { CreateAuthorPayload, EditAuthorPayload } from '../../../../../libs/services/author/author-types'

export class CreateAuthorDto implements CreateAuthorPayload {
	@IsString() name: string
	@IsString() description: string
	@IsString() picture: string
	@IsArray() books: number[]
}
export class EditAuthorDto implements EditAuthorPayload {
	@IsString() @IsOptional() name: string
	@IsString() @IsOptional() description: string
	@IsString() @IsOptional() picture: string
	@IsArray() @IsOptional() books: number[]
}
