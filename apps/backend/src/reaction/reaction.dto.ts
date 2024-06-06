import { createZodDto } from '@anatine/zod-nestjs'
import { extendZodWithOpenApi } from '@anatine/zod-openapi'
import { CreateReactionSchema } from 'global/validation/reaction/create.reaction.schema'
import {
	ReactionByBookOutputSchema,
	ReactionListOutputSchema
} from 'global/validation/reaction/reaction.schema'
import { z } from 'zod'

extendZodWithOpenApi(z)
export class CreateReaction extends createZodDto(CreateReactionSchema) {}
export class ReactionListOutput extends createZodDto(
	ReactionListOutputSchema
) {}
export class ReactionByBookOutput extends createZodDto(
	ReactionByBookOutputSchema
) {}
