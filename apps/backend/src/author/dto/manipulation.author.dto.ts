import { IsArray, IsOptional, IsString } from 'class-validator'
import type {
	CreateAuthorPayload,
	EditAuthorPayload
} from '../../../../../libs/global/services-types/author-types'

export class CreateAuthorDto implements CreateAuthorPayload {
	@IsString() name: string
	@IsString() description: string
	@IsString() picture: string
}
export class EditAuthorDto implements EditAuthorPayload {
	@IsString() @IsOptional() name: string
	@IsString() @IsOptional() description: string
	@IsString() @IsOptional() picture: string
	@IsArray() @IsOptional() books: number[]
}
