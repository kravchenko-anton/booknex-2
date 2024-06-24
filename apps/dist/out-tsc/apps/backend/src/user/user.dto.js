import { createZodDto } from '@anatine/zod-nestjs';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { HistorySchema, UserCatalogOutputSchema, UserLibraryOutputSchema, UserSchema, UserStatisticsSchema } from 'global/validation/user/user.schema';
import { z } from 'zod';
extendZodWithOpenApi(z);
export class User extends createZodDto(UserSchema) {
}
export class ReadingHistory extends createZodDto(HistorySchema) {
}
export class UserStatistics extends createZodDto(UserStatisticsSchema) {
}
export class UserCatalogOutput extends createZodDto(UserCatalogOutputSchema) {
}
export class UserLibraryOutput extends createZodDto(UserLibraryOutputSchema) {
}
//# sourceMappingURL=user.dto.js.map