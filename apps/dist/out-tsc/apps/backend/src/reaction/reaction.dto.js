import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { CreateReactionSchema } from 'global/validation/reaction/create.reaction.schema';
import { ReactionByBookOutputSchema, ReactionListOutputSchema } from 'global/validation/reaction/reaction.schema';
import { UpdateReactionSchema } from 'global/validation/reaction/update.reaction.schema';
import { z } from 'zod';
extendZodWithOpenApi(z);
export class CreateReaction extends createZodDto(CreateReactionSchema) {
}
export class UpdateReaction extends createZodDto(UpdateReactionSchema) {
}
export class ReactionListOutput extends createZodDto(ReactionListOutputSchema) {
}
export class ReactionByBookOutput extends createZodDto(ReactionByBookOutputSchema) {
}
//# sourceMappingURL=reaction.dto.js.map